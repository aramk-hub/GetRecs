import React from 'react'
import {
    HStack,
    Image, 
    Link,
    Card, 
    CardBody, 
    CardHeader, 
    Heading,
    Box, 
    Text,
    StackDivider,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
    Flex,
    Fade, 
    ScaleFade, 
    Slide, 
    SlideFade, 
    Collapse,
    useDisclosure,
    Spacer
} from '@chakra-ui/react'
import { useEffect, useState, Fragment,  } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar';
import axios from 'axios'
import background from "./record-image.jpeg";
import logo from '../spotify-icons-logos/icons/RGB/PNG/Spotify_Icon_RGB_Black.png';
import './statistics.css'

function Statistics() {

    const { isOpen, onToggle } = useDisclosure()

    const token = window.localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [shortTopArtists, setShortTopArtists] = useState({});
    const [mediumTopArtists, setMediumTopArtists] = useState({});
    const [longTopArtists, setLongTopArtists] = useState({});
    const [shortTopTracks, setShortTopTracks] = useState({});
    const [mediumTopTracks, setMediumTopTracks] = useState({});
    const [longTopTracks, setLongTopTracks] = useState({});    
    // const [term, setTerm] = useState("short");

    useEffect(() => {
        const getTopArtists = async (timerange, limit) => {
            const {data} = await axios({
                url: 'https://api.spotify.com/v1/me/top/artists',
                params: {
                    time_range: timerange,
                    limit: limit,
                },
                method: 'get',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });
                        
            if (timerange == "short_term") {
                setShortTopArtists(data.items);
            } else if (timerange == "medium_term") {
                setMediumTopArtists(data.items);
            }else {
                setLongTopArtists(data.items);
            }
            
        }

        const getTopTracks = async (timerange, limit) => {
            const{data} = await axios({
                url: 'https://api.spotify.com/v1/me/top/tracks',
                params: {
                    time_range: timerange,
                    limit: limit,
                },
                method: 'get',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });
            if (timerange == "short_term") {
                setShortTopTracks(data.items);
            } else if (timerange == "medium_term") {
                setMediumTopTracks(data.items);
            }else {
                setLongTopTracks(data.items);
            }
        }

        getTopArtists("short_term", 50);    
        getTopArtists("medium_term", 50);
        getTopArtists("long_term", 50);
        getTopTracks("short_term", 50);    
        getTopTracks("medium_term", 50);
        getTopTracks("long_term", 50);
           
    }, []);


    

    
    

    

    

    // const getTopGenres = (topArtists) = {

    // }


    const renderArtists = (range) => {
        var topArtists = {}
        if (range == "short") {
            topArtists = shortTopArtists;
        } else if (range == "medium") {
            topArtists = mediumTopArtists;
        } else {
            topArtists = longTopArtists;
        }

        if (topArtists.length > 0) {
        return (<Fragment>
        <CardBody w="100%" h="100%">
            <Stack divider={<StackDivider />} spacing='2'>
            {topArtists.map((artist, i) => {
            return (<Box maxHeight="90%">
                <Link target="_blank" href={artist.external_urls.spotify}>
                <Image  float="right" height='7vmin' width='7vmin' src={artist.images[0].url}/>
                </Link>
                <Heading fontSize="2vmin"><b> {i+1}. </b> &nbsp; <b>{artist.name}</b> &nbsp;<Link top="1" display="inline-flex" position="relative" target="_blank" href={artist.external_urls.spotify}>
                <Image src={logo} height="2.75vmin" width="2.75vmin"/>
                </Link></Heading>
                
                
                
            </Box>)})}
            
            </Stack>
            
        </CardBody>
        
        </Fragment>) 
        }
    }

    const renderTracks = (range) => {
        var topTracks = {}
        if (range == "short") {
            topTracks = shortTopTracks;
        } else if (range == "medium") {
            topTracks = mediumTopTracks;
        } else {
            topTracks = longTopTracks;
        }

        if (topTracks.length > 0) {
        return (<Fragment>
        <CardBody w="100%" h="100%">
            <Stack divider={<StackDivider />} spacing='2'>
            {topTracks.map((track, i) => {
            return (<Box maxHeight="90%">
                <Link target="_blank" href={track.album.external_urls.spotify}>
                <Image  float="right" height='7vmin' width='7vmin' src={track.album.images[0].url}/>
                </Link>
                <Heading fontSize="2vmin"><b> {i+1}. </b> &nbsp; <b>{track.name}</b> &nbsp;<Link top="1" display="inline-flex" position="relative" target="_blank" href={track.external_urls.spotify}>
                <Image src={logo} height="2.75vmin" width="2.75vmin"/>
                </Link></Heading>
                
                <Text lineHeight="5vmin" fontSize='2vmin'>
                    
                        {track.artists[0].name}                    
                </Text>
                
                
            </Box>)})}
            
            </Stack>
            
        </CardBody>
        
        </Fragment>) 
        }
    }


  return (
      <div className='statistics'>   
        <Sidebar/>
        <Flex  
        maxH="100%" 
        maxWidth="100%" 
        marginLeft="10%"
        alignItems={"left"} 
        justifyContent={"left"} 
        overflowY="scroll"
        gridColumn="2"
        >
            <Flex    
                flex='1 1 40%'
                gridColumn="2"
                alignItems={"left"}
                justifyContent={"center"}
                maxW='95%'
                flexDirection="column"
                h="100%"
                p={4}
                //borderRadius={8}     
            > 

            
            <Card flexDirection="column" position="relative" maxW="100%" height="100%">
            <Tabs isFitted w="100%" h="100%" position="relative" colorScheme="purple" size='md'>
            <TabList>
                <Tab fontSize="2vmin" _hover={{color:"orange.300"}}>Top Artists</Tab>
                <Tab  fontSize="2vmin" _hover={{color:"orange.300"}}>Top Tracks</Tab>
                <Tab fontSize="2vmin" _hover={{color:"orange.300"}}>Top Genres</Tab>
            </TabList>
            
            <TabPanels>
                <TabPanel>
                <Tabs isFitted position="relative" variant='enclosed' colorScheme="purple" size='md'>
                <TabList>
                    <Tab onClick={onToggle} fontSize="2vmin" _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Last Month</Tab>
                    <Tab onClick={onToggle} fontSize="2vmin" _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Last 6 Months</Tab>
                    <Tab onClick={onToggle} fontSize="2vmin" _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>All-Time</Tab>
                </TabList>
                <TabPanels>
                

                    {/* short term */}
                    <TabPanel>
                        {renderArtists("short")}
                    </TabPanel>

                    {/* medium term */}
                    <TabPanel>
                        {renderArtists("medium")}
                    </TabPanel>

                    {/* long term */}
                    <TabPanel>
                        {renderArtists("long")}
                    </TabPanel>
                </TabPanels>
                </Tabs>
                </TabPanel>

                <TabPanel>
                <Tabs isFitted position="relative" variant='enclosed' colorScheme="purple" size='md'>
                <TabList>
                    <Tab onClick={onToggle} fontSize="2vmin" _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Last Month</Tab>
                    <Tab onClick={onToggle} fontSize="2vmin" _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Last 6 Months</Tab>
                    <Tab onClick={onToggle} fontSize="2vmin" _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>All-Time</Tab>
                </TabList>
                <TabPanels>
                

                    {/* short term */}
                    <TabPanel>
                        {renderTracks("short")}
                    </TabPanel>

                    {/* medium term */}
                    <TabPanel>
                        {renderTracks("medium")}
                    </TabPanel>

                    {/* long term */}
                    <TabPanel>
                        {renderTracks("long")}
                    </TabPanel>
                </TabPanels>
                </Tabs>
                </TabPanel>

                
                



                {/* <TabPanel  w="100vh">
                

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                    {/* {getTopTracks()} */}
                    {/* </Stack>
                </CardBody>
                
                </TabPanel>

                <TabPanel  w="100vh">
                

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                    
                    </Stack>
                </CardBody>
                
                </TabPanel> */}


                
            </TabPanels>
            </Tabs>
            </Card>
            
            </Flex>
                
            
        </Flex>
            



      </div>
    
  );
}

export default Statistics;
