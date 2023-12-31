import React from "react";
import {
    PopoverArrow,
    PopoverContent,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useColorModeValue,
    VStack,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    InputGroup,
    InputLeftElement,
    Card,
    CardHeader,
    CardBody,
    Stack,
    useDisclosure,
    Text,
    PopoverTrigger,
    Popover,
    Toast,
    useToast
  } from '@chakra-ui/react';
import {
    FiHash,
    FiFolder, 
    FiMusic,
    FiUsers,
} from 'react-icons/fi'

import { useState, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate }
    from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import SignIn from './SignIn';
import './search.css'
import '../theme.js'
import axios from 'axios';
import background from "./record-image.jpeg";
import logo from '../spotify-icons-logos/icons/RGB/PNG/Spotify_Icon_RGB_Black.png';
 
const Search = () => {

    const toast = useToast();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const token = window.localStorage.getItem("token");
    const [recs, setRecs] = useState([]);
    const [user, setUser] = useState(null);
    const [searched, setSearched] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [playlistCreated, setPlaylistCreated] = useState(false);
    // document.addEventListener('DOMContentLoaded', function GetFavColor() {
    //         //document.body.style.backgroundColor = {background};
    // });

    useEffect(() => {
        const fetchUser = async () => {
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/me',
            
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        setUser(data);
    }
    fetchUser();       
    }, []);

    const validateInputs = (trackList, artistList, genreSeeds) => {
        if (trackList.length == 0 && artistList.length == 0 && genreSeeds.length == 0) {
            return "nothing";
        } else if (trackList.length + artistList.length + genreSeeds.length > 5) {
            return "excess";
        } else {
            return "good"
        }
    }

    

    async function handleClick() {

        var trackList = document.getElementById('trackslist').value.split(',');
        var artistList = document.getElementById('artistlist').value.split(',');
        var genreSeeds = document.getElementById('genrelist').value.split(',');
        

        trackList = trackList.filter(item => item);
        artistList = artistList.filter(item => item);
        genreSeeds = genreSeeds.filter(item => item);

        const str = validateInputs(trackList, artistList, genreSeeds);
        
        if ( str == "nothing" || str == "excess") {
            if (str == "nothing") {
                toast({
                    title: 'Whoops!',
                    description: "Looks like you didnt input anything!",
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
                return null;
            } else {
                toast({
                    title: 'Whoops!',
                    description: "Looks like you gave more than 5 items!",
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });
                return null;
            }
        }

            
        // Get ArtistIDs
        var artistSeeds = [];
        if (artistList.length > 0) {
            
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
        }

        // Get TrackID
        
        var trackSeeds = [];
        if (trackList.length > 0) {
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
        }

        var limit = parseInt(document.getElementById('limit').value);

        const artist_param = artistSeeds.length == 0 ? "" : artistSeeds.toString()
        const track_param = trackSeeds.length == 0 ? "" : trackSeeds.toString()
        const params = {
            seed_artists: artist_param,
            seed_genres: genreSeeds.toString(),
            seed_tracks: track_param,
            limit: limit
          };
          
          for (const key of Object.keys(params)) {
            if (params[key] === "") {
              delete params[key];
            }
          }
        
        var recs = [];
        try {
        const{data} = await axios({
            url: 'https://api.spotify.com/v1/recommendations?',
            params: params,
            method: 'get',
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        recs.push(data.tracks);
        setRecs(data.tracks);
        setSearched(true);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    const createPlaylist = async () => {
        
        var pl_name = document.getElementById('playlist_name').value;
        var pl_description = document.getElementById('playlist_description').value;

        const headers = {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        const param = JSON.stringify({
            "name": pl_name,
            "description": pl_description,
            "public": true
        })

        var arr = [];
        for (var rec in recs) {
            arr[rec] = "spotify:track:" + recs[rec].id.toString();
        }

        const bod = JSON.stringify({
            "uris" : arr
        })

        const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            method: "POST",
            headers: headers, 
            body: param
          }).then(response => response.json())
          .then(async data => {
            await fetch(`https://api.spotify.com/v1/playlists/${data['id']}/tracks`, {
                    method: "POST",
                    headers: headers, 
                    body: bod
                    })
          }).catch(err => {
              console.error('Request failed', err);
          })
            
        setPlaylistCreated(true);
        onClose(); 
        toast({
            title: 'Playlist created!',
            description: "You'll find it in your account!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

    }

    const renderRecs = () => {
        if (searched) {
        return (
            <Fragment>
            <Card border="none"
                        boxShadow="none"
                        background="rgba(204, 204, 204, 0.0)" display="block"  minWidth="35%" width="75%" maxHeight="100%">
            <CardHeader maxHeight="60px">
                <Heading fontSize='3vmin' align="center">Recommendations</Heading>
            </CardHeader>

            <CardBody overflowY="scroll">
                <Stack divider={<StackDivider opacity="25%"/>} spacing='2'>
                    {recs.map((track, i) => {
                        return (
                            <Box maxHeight='100%'>
                                <Link target="_blank" href={track.album.external_urls.spotify}>
                                <Image float="right" height='7vmin' width='7vmin' align='right' src={track.album.images[0].url}/>
                                </Link>
                                <Heading size='xs' textTransform='uppercase'>
                                {track.name}
                                 &nbsp; <Link top="1" fontSize="2vmin" color="purple.500" position="relative" display="inline-block" target='_blank' href={track.external_urls.spotify}>
                                <Image src={logo} height="2.25vmin" width="2.25vmin"/></Link>
                                </Heading>
                                <Text pt='2' fontSize='2vmin'>
                                    by <Link color="purple.500" target='_blank' href={track.artists[0].external_urls.spotify}>
                                        {track.artists[0].name}</Link>                        
                                </Text>
                                
                            </Box>
                        )
                    })}
                </Stack>
            </CardBody>

            <Center>
            <Button mb={3} whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" marginTop="20px" width="15" textAlign="center" colorScheme="purple"  size='md' onClick={onOpen}>
                                    Convert to Playlist
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter='blur(10px)'/>
                <ModalContent>
                <ModalHeader >Create a Playlist</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                    This playlist will be added to your spotify account. Let's give it a name and a description!
                    <FormControl mt={4}>
                    <FormLabel>Playlist Name</FormLabel>
                    <Input color="blackAlpha.900" id='playlist_name' />
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Input color="blackAlpha.900" id='playlist_description' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" colorScheme='purple' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden"   size='md' onClick={createPlaylist}>
                    Create</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            </Center>
            </Card>
            
            </Fragment>
        );
        }
    }

    return (
        
        
        <div>
            <div className="search" margin="0 auto" overflow-y="auto" >
                <Sidebar />

                <Flex
         
        maxWidth="100%" 
        marginLeft="0%"
        alignItems={"left"} 
        justifyContent={"left"} 
        gridColumn="2"
        >
            <VStack>
            <Flex    
                flex='1 1 40%'
                gridColumn="2"
                alignItems={"left"}
                justifyContent={"top"}
                float="left"
                maxW='95%'
                flexDirection="column"
                maxHeight="100%"
                p={4}
                //borderRadius={8}     
            > 

            
            <Card style={{ border: "none", boxShadow: "none" }} background="rgba(204, 204, 204, 0.0)" flexDirection="column" position="relative" maxW="100%" maxHeight="50%">
                        
                              
                        <CardHeader marginLeft='auto' marginRight='auto'>
                            <Heading  h="1vmin" alignText="center" fontSize="3vmin" color="blackAlpha.900" size='md'>Welcome! Here's how it works...</Heading>
                        </CardHeader>
                        <CardBody fontSize= "2vmin" marginLeft='auto'
                                    marginRight='auto' float="left" color="blackAlpha.900" marginBottom="0px" >
                            The site utilizes Spotify's very own recommendation algorithm, except it is fine tuned to exactly
                            what you want to get recommendations based on. The algorithm <b>requires</b> at least one of the 
                            tracks, artists, or genres section to be filled in, though you could fill in more than just one. 
                            In fact, you can fill in all three of them, <b>but</b> you can only input 5 items across those three
                            groups in total. Have fun!
                                                   
                            <Fragment>
                                
                                {/* <VStack marginTop="15px"> */}
                                <FormControl size="2vw" marginTop="10px" direction="row" alignItems="center">
                                <VStack display="grid" position="relative">
                                <Stack
                                    position="relative"
                                    alignItems="center"
                                    ml="10%"
                                    direction="row"
                                    flexWrap="wrap"
                                    spacing={4}
                                >
                                        <div className="form-group" >
                                        <FormLabel fontSize= "2vmin" color="blackAlpha.900">Artists</FormLabel>
                                        <InputGroup >
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon fontSize= "2vmin" as={FiUsers} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input fontSize= "2vmin" w="90%" color="blackAlpha.900" placeholder='Tame Impala, Nas' id="artistlist"/>
                                        </InputGroup>
                                        </div>

                                        <div className="form-group" >
                                        <FormLabel fontSize= "2vmin" color="blackAlpha.900">Genres</FormLabel>
                                        <InputGroup >
                                        <InputLeftElement pointerEvents='none'>
                                            <Icon fontSize= "2vmin" float="left" as={FiFolder} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input fontSize= "2vmin" w="90%" color="blackAlpha.900" placeholder='rap, alternative' id="genrelist"/>
                                        </InputGroup>
                                        </div>

                                        <div className="form-group" >
                                        <FormLabel fontSize= "2vmin" color="blackAlpha.900">Tracks</FormLabel>
                                        <Popover trigger="hover" openDelay={100} closeDelay={100}>
                                            <PopoverTrigger>
                                                <InputGroup >
                                                <InputLeftElement pointerEvents='none'>
                                                    <Icon fontSize= "2vmin" float="left" as={FiMusic} color={"gray.500"} />
                                                </InputLeftElement>
                                                <Input fontSize= "2vmin" w="90%" color="blackAlpha.900" placeholder='A&W, As It Was' id="trackslist"/>
                                                </InputGroup>
                                            </PopoverTrigger>
                                            <PopoverContent w="30vmin" bg="orange.100">
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader><b>Heads up!</b></PopoverHeader>
                                                <PopoverBody>If necessary, you should specify the artist of the song
                                                    just like you would on spotify search (i.e. "Money pink floyd"), since there can be 
                                                    convoluted results at times.
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                        </div>

                                        <div className="form-group" >
                                        
                                        <FormLabel fontSize= "2vmin"color="blackAlpha.900">Limit</FormLabel>
                                        <InputGroup>
                                        <NumberInput fontSize= "2vmin" w="75px" color="blackAlpha.900" id="limit" defaultValue={20} min={1} max={100}>
                                        <NumberInputField fontSize= "2vmin" />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                        </NumberInput>
                                        </InputGroup>
                                        </div>
                                                                    
                                
                                </Stack>
                                <Center>
                                <Button whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" marginTop="20px" width="15" textAlign="center" colorScheme="purple" size='md' onClick={handleClick}>
                                        Get Recs
                                </Button>
                                </Center>
                                </VStack>
                                </FormControl>                                
                                </Fragment>
                            </CardBody>
                            
                            {/* {playlistCreated ? 
                                <div>
                                    
                                </div>
                             : null} */}
                             
                    </Card>
                    
                    </Flex>
                    <Flex 
                        
                        flex='1 1 40%'
                        gridColumn="1"
                        alignItems={"center"}
                        justifyContent={"center"}
                        w='100%'
                        display="flex"
                        position="relative"
                        flexDirection="column"
                        h="100%"
                        p={6}
                        
                        //borderRadius={8}
                            
                    > 
                    {renderRecs()}
                    </Flex>
                    </VStack>
                </Flex>
                
            </div>
        </div>
    );
};

export default Search;
                                