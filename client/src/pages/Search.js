import React from "react";
import {
    Center,
    Icon,
    Box,
    StackDivider,
    Flex,
    Heading,
    Input,
    Image, 
    Link,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    Switch,
    Spacer,
    FormControl,
    FormLabel,
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
    CardBody,
    Stack,
    Text
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
import background from "./record-image.jpeg";

 
const Search = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const token = window.localStorage.getItem("token");
    const [advancedSearch, setAdvancedSearch] = useState("");
    const [recs, setRecs] = useState([]);
    const [user, setUser] = useState(null);
    const [searched, setSearched] = useState(false);
    
    document.addEventListener('DOMContentLoaded', function GetFavColor() {
            document.body.style.backgroundColor = {background};
    });
    

    const handleChange = (e) => {
        var advancedSearch = document.getElementById("advancedSearch").checked;
        console.log(advancedSearch);


            
    }

    const validateInputs = (trackList, artistList, genreSeeds) => {
        console.log("VALIDATING INPUTS");
        if (trackList.length + artistList.length + genreSeeds.length > 5) {
            return false;
        }
    }

    

    async function handleClick() {

        var trackList = document.getElementById('trackslist').value.split(',');
        var artistList = document.getElementById('artistlist').value.split(',');
        var genreSeeds = document.getElementById('genrelist').value.split(',');

        if (!validateInputs(trackList, artistList, genreSeeds)) {

        }
        console.log(genreSeeds.toString())

        // if (!validateInputs(trackList, artistList, genreSeeds)) {
        //     <alert>Check your inputs</alert>
        //     return
        // }
            
        // Get ArtistIDs
        
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
            console.log("artistseeds: " + artistSeeds)
        }

        // Get TrackID
        
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
            console.log("trackseeds: " + trackSeeds)
        }

        

        // var meter = parseInt(document.getElementById('target_time_signature').value)
        // console.log(meter);

        // var BPM = parseFloat(document.getElementById('target_tempo').value)
        // console.log(BPM);

        // var key = parseFloat(document.getElementById('target_key').value)
        // console.log(key);

        var limit = parseInt(document.getElementById('limit').value);
        console.log("limit" + limit)

        var recs = [];
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/recommendations?',
            params: {
                seed_artists: artistSeeds.toString(),
                seed_genres: genreSeeds.toString(),
                seed_tracks: trackSeeds.toString(),
                limit: limit,
                // target_time_signature: 7,
                // target_tempo: BPM,
                // target_key: key
            },
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        console.log(artistSeeds.toString())
        recs.push(data.tracks);
        setRecs(data.tracks);
        console.log(recs);
        setSearched(true);
        
    }

    const renderRecs = () => {
        console.log("SEARCHED: " + searched);
        if (searched) {
        return (
            <Card  w="700px" h="400px" bg={formBackground}>
            <CardHeader h='20px'>
                <Heading size='md' align="center">Recommendations</Heading>
            </CardHeader>

            <CardBody overflowY='scroll'>
                <Stack divider={<StackDivider />} spacing='2'>
                    {recs.map((track, i) => {
                        return (
                            <Box h='45px'>
                                {/* <Link target='_blank' to={track.album.external_urls.spotify}> */}
                                <Image float="right" h='45px' w='45px' align='right' src={track.album.images[0].url}/>
                                {/* </Link> */}
                                <Heading size='xs' textTransform='uppercase'>
                                <Link color="purple.500" target='_blank' href={track.external_urls.spotify}>{track.name}</Link>
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    by <Link color="purple.500" target='_blank' href={track.artists[0].external_urls.spotify}>
                                        {track.artists[0].name}</Link>                        
                                </Text>
                                
                            </Box>
                        )
                    })}
                </Stack>
            </CardBody>
            </Card>
       );
        }
    }

    return (
        <div>
            <div className="search">
                <Sidebar />
                
                
                <Flex h="100vh" w="90%" alignItems={"center"} justifyContent={"center"} gridColumn="2">
                    <Flex 
                        gridColumn="2"
                        alignItems={"center"}
                        justifyContent={"center"}
                        w='100%'
                        flexDirection="column"
                        p={6}
                        borderRadius={8}
                            
                    > 
                    <Card h="92%" color="gray.300" opacity="80%" position="fixed" top="5%" align="center" w="60%" p={6} boxShadow="lg" bg={formBackground}>
                        
                              
                        <CardHeader>
                            <Heading h="0" color="blackAlpha.900" size='md'>Welcome! Here's how it works...</Heading>
                        </CardHeader>
                        <CardBody color="blackAlpha.900" marginBottom="0px" >
                            The site utilizes Spotify's very own recommendation algorithm, except it is fine tuned to exactly
                            what you want to get recommendations based on. The algorithm <b>requires</b> at least one of the 
                            tracks, artists, or genres section to be filled in, though you could fill in more than just one. 
                            In fact, you can fill in all three of them, <b>but</b> you can only input 5 items across those three
                            groups in total. Have fun!
                                                   
                            <Fragment>
                                
                                {/* <VStack marginTop="15px"> */}
                                <FormControl marginTop="10px" direction="row" w="100px">
                                <VStack display="inline-block">
                                <HStack
                                    marginLeft={4}
                                    spacing={4}
                                >
                                        <div className="form-group">
                                        <FormLabel color="blackAlpha.900">Artists</FormLabel>
                                        <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiUsers} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input w="200px" color="blackAlpha.900" placeholder='Tame Impala, Nas' id="artistlist"/>
                                        </InputGroup>
                                        </div>

                                        <div className="form-group">
                                        <FormLabel color="blackAlpha.900">Genres</FormLabel>
                                        <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiFolder} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input w="200px" color="blackAlpha.900" placeholder='rap, alternative' id="genrelist"/>
                                        </InputGroup>
                                        </div>

                                        <div className="form-group">
                                        <FormLabel color="blackAlpha.900">Tracks</FormLabel>
                                        <InputGroup >
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon as={FiMusic} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input w="200px" color="blackAlpha.900" placeholder='A&W, As It Was' id="trackslist"/>
                                        </InputGroup>
                                        </div>

                                        <div className="form-group">
                                        <FormLabel color="blackAlpha.900">Limit</FormLabel>
                                        <InputGroup>
                                        <NumberInput w="40px" color="blackAlpha.900" id="limit" w="75px" defaultValue={20} min={1} max={100}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                        </NumberInput>
                                        </InputGroup>
                                        </div>
                                                                    
                                
                                </HStack>
                                <Center>
                                <Button marginLeft="40px" marginTop="20px" w="20%" textAlign="center" opacity="1" colorScheme="purple" backgroundColor="purple.500" size='md' onClick={handleClick}>
                                        Get Recs
                                </Button>
                                </Center>
                                </VStack>
                                </FormControl>
                                {/* </VStack> */}
                                
                                </Fragment>
                                    
                                
                            {/* </HStack> */}
                            {/* </Fragment> */}
                            </CardBody>
                            {renderRecs()}
                    </Card>
                    </Flex>
                </Flex>

                
            </div>
        </div>
    );
};

export default Search;
                                
                                    {/* <Stack direction="row" spacing='24px'> */}
                                    {/* <Fragment> */}
                                    
                                    {/* <FormControl>
                                    
                                    <FormLabel>Meter</FormLabel>
                                    <Popover trigger="hover" OpenDelay="100" closeDelay="100">
                                        <PopoverTrigger>
                                            <InputGroup>
                                            <NumberInput id="target_time_signature" w="75px" min={3} max={7}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                            </NumberInput>
                                            </InputGroup>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>An estimated time signature. The time signature (meter) is a notational
                                                 convention to specify how many beats are in each bar (or measure). The time 
                                                 signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".</PopoverBody>
                                        </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    
                                    <FormControl>
                                    <FormLabel>BPM</FormLabel>
                                        <Popover trigger="hover" OpenDelay="100" closeDelay="100">
                                        <PopoverTrigger>
                                            <InputGroup>
                                            <NumberInput id="target_tempo" w="75px">
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                            </NumberInput>
                                            </InputGroup>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>The overall estimated tempo of a track in beats per minute (BPM). 
                                                In musical terminology, tempo is the speed or pace of a given piece and 
                                                derives directly from the average beat duration.</PopoverBody>
                                        </PopoverContent>
                                        </Popover>
                                    
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Key</FormLabel>
                                        <Popover trigger="hover" OpenDelay="100" closeDelay="100">
                                        <PopoverTrigger>
                                            <InputGroup>
                                            <NumberInput id="target_key" w="75px" min={0} max={11}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                            </NumberInput>
                                            </InputGroup>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>The key the track is in. Integers map to pitches using standard <space/>
                                            <Link color='purple.500' href='https://en.wikipedia.org/wiki/Pitch_class'>Pitch Class notation</Link>. 
                                                E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, 
                                                the value is -1.</PopoverBody>
                                        </PopoverContent>
                                        </Popover>
                                        
                                    </FormControl> */}

                                    
                                    
                            
                            
                            {/* <HStack> */}
                            
                            {/* <Flex h="75px" alignContent="center" justifyContent="center"/> */}
                                {/* <FormControl as={SimpleGrid} columns={{ base: 2, lg: 3 }}> */}
                                {/* <FormLabel htmlFor="advancedSearch" alignContent="center">Advanced Search:</FormLabel>
                                <Switch 
                                    id="advancedSearch" 
                                    label="Advanced search" 
                                    colorScheme='purple' 
                                    size='lg' 
                                    onChange={handleChange}
                                /> */}
                                
                                
 
