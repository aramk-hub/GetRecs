import React from "react";
import {
    Alert, 
    AlertIcon,
    Icon,
    Box,
    StackDivider,
    Select,
    Flex,
    extendTheme,
    Link,
    Heading,
    Input,
    Image, 
    Button,
    FormControl,
    FormLabel,
    Switch,
    Spacer,
    useColorMode,
    useColorModeValue,
    VStack,
    SimpleGrid,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    HStack,
    InputGroup,
    InputLeftElement,
    Card,
    CardHeader,
    CardBody
  } from '@chakra-ui/react';
import {
    FiHash,
    FiFolder, 
    FiMusic,
    FiUsers,
} from 'react-icons/fi'

import { useState, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import SignIn from './SignIn';
import './search.css'
import '../theme.js'
import axios from 'axios';

 
const Search = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const token = window.localStorage.getItem("token");
    const [advancedSearch, setAdvancedSearch] = useState("");
    

    const handleChange = (e) => {
        var advancedSearch = document.getElementById("advancedSearch").checked;
        console.log(advancedSearch);


            
    }

    const idk = () => {
        console.log("INSIDE");
    }

    async function handleClick() {
            
        // Get ArtistIDs
        var artistList = document.getElementById('artistlist').value.split(',');
        var artistSeeds = [];
        for (const artist of artistList) {
            const{data} = await axios({
                url: 'https://api.spotify.com/v1/search/',
                params: {
                    q: artist,
                    type: "artist",
                    limit: 1,

                },
                method: 'get',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            artistSeeds.push(data.artists.items[0].id);
            console.log(artistSeeds);
        }

        // Get TrackID
        var trackList = document.getElementById('trackslist').value.split(',');
        var trackSeeds = [];
        for (const track of trackList) {
            const{data} = await axios({
                url: 'https://api.spotify.com/v1/search/',
                params: {
                    q: track,
                    type: "track",
                    limit: 1,

                },
                method: 'get',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            trackSeeds.push(data.tracks.items[0].id);
            console.log(trackSeeds);
        }

        var genreSeeds = document.getElementById('genrelist').value.split(',');
        console.log(genreSeeds);

        var recs = [];
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/recommendations?',
            params: {
                seed_artists: artistSeeds.toString(),
                seed_genres: genreSeeds.toString(),
                seed_tracks: trackSeeds.toString(),
                limit: parseInt(document.getElementById('limit').value)
            },
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        recs.push(data.tracks);
        console.log(data);
        
    }

    return (
        <div>
            <div className="search">
                <Sidebar />
                
                <Flex h="100vh" w="90%" alignItems={"center"} justifyContent={"center"} gridColumn="2">
                    <Card >
                        
                        <Flex
                            gridColumn="2"
                            alignItems={"center"}
                            justifyContent={"center"}
                            
                            w='1000px'
                            flexDirection="column"
                            bg={formBackground}
                            p={12}
                            borderRadius={8}
                            boxShadow="lg"
                        >       
                        <CardHeader>
                            <Heading size='md'>Welcome! Here's how it works...</Heading>
                        </CardHeader>
                        <CardBody>
                            The site utilizes Spotify's very own recommendation algorithm, except it is fine tuned to exactly
                            what you want to get recommendations based on. The algorithm <b>requires</b> at least one of the 
                            tracks, artists, or genres section to be filled in, though you could fill in more than just one. 
                            In fact, you can fill in all three of them, <b>but</b> you can only input 5 items across those three
                            groups in total. There are also some advanced search options, such as time signature (3/4, 4/4, etc.)
                            or beats per minute (BPM) for when you really want to find something specific like Money's unique 7/4 
                            time signature! As a heads up, for the time signature search, be sure to only use the numerator of it. 
                            So, if you want 3/4, just input 3, and for BPM think of 118 as an example! Spotify's algorithm does not guarantee any order, but you can 
                            choose how to sort the results, if you want. Have fun!
                        </CardBody>                             
                            <Fragment>
                            <VStack>
                                <HStack
                                    divider={<StackDivider borderColor='gray.200' />}
                                    spacing={2}
                                    align='stretch'
                                >
                                    <FormControl>
                                        <FormLabel>Artists</FormLabel>
                                        <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiUsers} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input placeholder='Tame Impala, Nas' id="artistlist"/>
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Genres</FormLabel>
                                        <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiFolder} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input placeholder='rap, alternative' id="genrelist"/>
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Tracks</FormLabel>
                                        <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiMusic} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input placeholder='A&W, As It Was' id="trackslist"/>
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Limit</FormLabel>
                                        <InputGroup>
                                        <NumberInput id="limit" w="75px" defaultValue={20} min={1} max={100}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                        </NumberInput>
                                        {/* <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiHash} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input placeholder='20 (1-100)' id="limit"/> */}
                                        </InputGroup>
                                    </FormControl>
                                </HStack>

                                
                                {advancedSearch ? 
                                    //{idk}
                                    <HStack>
                                    <Fragment>
                                    <FormControl>
                                    <FormLabel>Time Signature</FormLabel>
                                    <InputGroup>
                                    <NumberInput id="target_time_signature" w="75px" min={3} max={7}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                    </NumberInput>
                                    </InputGroup>
                                    </FormControl>
                        
                                    <FormControl>
                                    <FormLabel>BPM</FormLabel>
                                    <InputGroup>
                                    <NumberInput id="target_tempo" w="75px" >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                    </NumberInput>
                                    </InputGroup>
                                    </FormControl>
                                    </Fragment>
                                    </HStack> 
                                    : null}

                                

                                
                            </VStack>
                            
                            <HStack>
                            <Flex h="75px" alignContent="center" justifyContent="center"/>
                                <FormControl as={SimpleGrid} columns={{ base: 2, lg: 5 }}>
                                <FormLabel htmlFor="advancedSearch" alignContent="center">Advanced Search:</FormLabel>
                                <Switch 
                                    id="advancedSearch" 
                                    label="Advanced search" 
                                    colorScheme='purple' 
                                    size='lg' 
                                    onChange={handleChange}
                                />

                                <Button colorScheme='purple' size='md' onClick={handleClick}>
                                        Get Recs
                                </Button>
                                </FormControl>
                            
                                
                            </HStack>
                            </Fragment>
                        </Flex>
                    </Card>
                </Flex>
                
            </div>
        </div>
    );
};
 
export default Search;