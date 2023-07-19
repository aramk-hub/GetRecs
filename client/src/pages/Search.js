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
    InputGroup,
    InputLeftElement
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

    const [select,setSelect]= useState();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const token = window.localStorage.getItem("token");
    

    const artistOrAlbum = (e) => {
        
        setSelect(e.target.value);
        
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
        }

        var genreSeeds = document.getElementById('genrelist').value.split(',');

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
                <Flex h="100vh" alignItems={"center"} justifyContent={"center"} gridColumn="2">
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        
                        w='500px'
                        flexDirection="column"
                        bg={formBackground}
                        p={12}
                        borderRadius={8}
                        boxShadow="lg"
                    >
                        <VStack
                            divider={<StackDivider borderColor='gray.200' />}
                            spacing={4}
                            align='stretch'
                        >
                            <Fragment>
                                
                                    <Fragment>
                                    <VStack
                                            divider={<StackDivider borderColor='gray.200' />}
                                            spacing={4}
                                            align='stretch'
                                    >
                                        <FormControl isRequired>
                                            <FormLabel>Artists</FormLabel>
                                            <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <Icon as={FiUsers} color={"gray.500"} />
                                            </InputLeftElement>
                                            <Input placeholder='The Beatles, Pink Floyd' id="artistlist"/>
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
                                            <FormLabel>Genres</FormLabel>
                                            <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <Icon as={FiFolder} color={"gray.500"} />
                                            </InputLeftElement>
                                            <Input placeholder='classical, country' id="genrelist"/>
                                            </InputGroup>
                                        </FormControl>

                                        <FormControl isRequired>
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
                                            <InputLeftElement pointerEvents='none'>
                                                <Icon as={FiHash} color={"gray.500"} />
                                            </InputLeftElement>
                                            <Input placeholder='Default is 20' id="limit"/>
                                            </InputGroup>
                                        </FormControl>
                                    
                                    <Button colorScheme='purple' size='md' onClick={handleClick}>
                                        Get Recs
                                    </Button>

                                    </VStack>
                                    </Fragment>
                            </Fragment>
                        </VStack>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
};
 
export default Search;