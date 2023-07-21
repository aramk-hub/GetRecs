import React from "react";
import {
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

 
const Search = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const token = window.localStorage.getItem("token");
    const [advancedSearch, setAdvancedSearch] = useState("");
    const [recs, setRecs] = useState([]);
    

    const handleChange = (e) => {
        var advancedSearch = document.getElementById("advancedSearch").checked;
        console.log(advancedSearch);


            
    }

    // const validateInputs = (trackList, artistList, genreSeeds) => {
    //     if (trackList.length + artistList.length + genreSeeds.length > 5) {
    //         return false;
    //     }
    // }

    async function handleClick() {

        var trackList = document.getElementById('trackslist').value.split(',');
        var artistList = document.getElementById('artistlist').value.split(',');
        var genreSeeds = document.getElementById('genrelist').value.split(',');

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
        }

        

        // var meter = parseInt(document.getElementById('target_time_signature').value)
        // console.log(meter);

        // var BPM = parseFloat(document.getElementById('target_tempo').value)
        // console.log(BPM);

        // var key = parseFloat(document.getElementById('target_key').value)
        // console.log(key);

        var recs = [];
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/recommendations?',
            params: {
                seed_artists: artistSeeds.toString(),
                seed_genres: genreSeeds.toString(),
                seed_tracks: trackSeeds.toString(),
                limit: parseInt(document.getElementById('limit').value),
                // target_time_signature: meter,
                // target_tempo: BPM,
                // target_key: key
            },
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        recs.push(data.tracks);
        setRecs(data.tracks);
        console.log(recs);
    }

    const renderRecs = () => {
        console.log("inside");

        return (<Flex h="75vh" w="90%" alignItems={"center"} justifyContent={"center"} gridColumn="2">
            <Card  w="500px" maxHeight='500px'>
            <CardHeader>
                <Heading size='md'>Recommendations</Heading>
            </CardHeader>

            <CardBody overflowY='auto'>
                <Stack divider={<StackDivider />} spacing='4'>
                    {recs.map((track, i) => {
                        return (
                            <Box>
                                {/* <Link target='_blank' to={track.album.external_urls.spotify}> */}
                                <Image float="right" h='75px' w='75px' align='right' src={track.album.images[0].url}/>
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
        </Flex>);
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
                            time signature! Have fun!
                        </CardBody>                             
                            <Fragment>
                                <VStack>
                                <HStack
                                    
                                    spacing={4}
                                    align='center'
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
                                    <Stack direction="row" spacing='24px'>
                                    <Fragment>
                                    
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

                                    
                                    </Fragment>
                                    </Stack>
                                    
                                    </VStack>
                            
                            
                            <HStack>
                            <Flex h="75px" alignContent="center" justifyContent="center"/>
                                <FormControl as={SimpleGrid} columns={{ base: 2, lg: 1 }}>
                                {/* <FormLabel htmlFor="advancedSearch" alignContent="center">Advanced Search:</FormLabel>
                                <Switch 
                                    id="advancedSearch" 
                                    label="Advanced search" 
                                    colorScheme='purple' 
                                    size='lg' 
                                    onChange={handleChange}
                                /> */}

                                <Button colorScheme='purple' size='md' onClick={handleClick}>
                                        Get Recs
                                </Button>
                                </FormControl>
                            
                                
                            </HStack>
                            </Fragment>
                        </Flex>
                    </Card>
                    
                </Flex>

                {renderRecs()}
                


                
                
            </div>
        </div>
    );
};
 
export default Search;