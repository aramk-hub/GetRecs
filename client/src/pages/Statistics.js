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
    useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState, Fragment,  } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar';
import axios from 'axios'
import background from "./record-image.jpeg";
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

        getTopArtists("short_term", 50);    
        getTopArtists("medium_term", 50);
        getTopArtists("long_term", 50)
           
    }, []);


    

    
    // const getTopTracks = async (timerange, limit) => {
    //     const{data} = await axios({
    //         url: 'https://api.spotify.com/v1/me/top/tracks',
    //         params: {
    //             time_range: timerange,
    //             limit: limit,
    //         },
    //         method: 'get',
    //         headers: {
    //             Authorization : `Bearer ${token}`
    //         }
    //     });
    //     setTopTracks(data);
    // }

    

    

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
        return (<CardBody>
            <Stack divider={<StackDivider />} spacing='2'>
            {topArtists.map((artist, i) => {
            return (<Box maxHeight='100%' textAlign="left">
            <HStack>
                <Text size="lg"><b> {i+1} </b></Text> &nbsp; 
                <Heading  size='sm' textTransform='uppercase'>
                <Link fontSize="2vmin" color="purple.500" target='_blank' href={artist.external_urls.spotify}>{artist.name}</Link>
                </Heading>
                
            </HStack>
            <Image borderRadius="full" float="right" height='12vmin' width='12vmin' align='right' src={artist.images[0].url}/>
            
            </Box>)})}
                
                
            </Stack>
        </CardBody>)
        
        
        
    }
}


  return (
      <div className='statistics'>
        
        
        
          
        <Sidebar/>
        
        
        <Flex  
        
        h="100vh" 
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
                w='100vmin'

                flexDirection="column"
                p={6}
                //borderRadius={8}
                            
            > 
           
           <Tabs w="100vmin" h="100vmin" position="relative" variant='soft-rounded' colorScheme="purple" size='md'>
            <TabList>
                <Tab _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Top Artists</Tab>
                <Tab  _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Top Tracks</Tab>
                <Tab _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Top Genres</Tab>
            </TabList>
            <TabPanels>
                <Tabs mt={2} w="100vmin" h="100vmin" position="relative" variant='soft-rounded' colorScheme="purple" size='md'>
                <TabList>
                    <Tab onClick={onToggle} _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Last Month</Tab>
                    <Tab onClick={onToggle}  _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Last 6 Months</Tab>
                    <Tab onClick={onToggle} _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>All-Time</Tab>
                </TabList>
                <TabPanels>
                <Fade in={isOpen} unmountOnExit>
                        <Box
                        p='40px'
                        color='white'
                        mt='4'
                        bg='teal.500'
                        rounded='md'
                        shadow='md'
                        >
                        Fade
                        </Box>
                    </Fade>

                    {/* short term */}
                    <TabPanel>
                    <Card  overflowY="scroll" position="relative" w="100vmin" >
                    <CardHeader>
                        <Heading size='md'>Client Report</Heading>
                    </CardHeader>
                    {renderArtists("short")}
                    
      
                    
                    </Card>
                    </TabPanel>

                    {/* medium term */}
                    <TabPanel>
                    <Card position="relative" w="100vmin" >
                    <CardHeader>
                        <Heading size='md'>Client Report</Heading>
                    </CardHeader>
                    {renderArtists("medium")}
                    
                    
                    </Card>
                    </TabPanel>

                    {/* long term */}
                    <TabPanel>
                    <Card position="relative" w="100vmin" >
                    <CardHeader>
                        <Heading size='md'>Client Report</Heading>
                    </CardHeader>
                    {renderArtists("long")}
                    
                    
                    </Card>
                    </TabPanel>
                </TabPanels>
                </Tabs>
                
                



                <TabPanel  w="100vh">
                <Card>
                <CardHeader>
                    <Heading size='md'>Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                    {/* {getTopTracks()} */}
                    </Stack>
                </CardBody>
                </Card>
                </TabPanel>

                <TabPanel  w="100vh">
                <Card>
                <CardHeader>
                    <Heading size='md'>Client Report</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                    
                    </Stack>
                </CardBody>
                </Card>
                </TabPanel>



            </TabPanels>
            </Tabs>
            </Flex>
                
            
        </Flex>
            



      </div>
    
  );
}

export default Statistics;
