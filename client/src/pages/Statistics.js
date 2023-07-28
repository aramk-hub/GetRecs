import React from 'react'
import {
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
    Flex
} from '@chakra-ui/react'
import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { Button, ButtonGroup, ChakraProvider, Stack, extendTheme } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar';
import axios from 'axios'
import background from "./record-image.jpeg";
import './statistics.css'

function Statistics() {

    const token = window.localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    

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
                        
            topArtists.push(data.items)
            console.log(topArtists);
            
        }
        
        getTopArtists();    
           
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

    

    const renderTopArtists = () => {
        return (<CardBody>
            <Stack divider={<StackDivider />} spacing='2'>
                {topArtists.map((artist, i) => {
                    <Box maxHeight='100%'>
                        <Text></Text>
                        <Image borderRadius="full" float="right" height='7vmin' width='7vmin' align='right' src={artist.images[0].url}/>
                        <Heading size='xs' textTransform='uppercase'>
                        <Link fontSize="2vmin" color="purple.500" target='_blank' href={artist.external_urls.spotify}>{artist.name}</Link>
                        </Heading>
                        
                    </Box>
                })}
            </Stack>
        </CardBody>);
    }



  return (
      
      <div className='statistics'>
        
        
          
        <Sidebar/>
        
        
        <Flex  
        
        h="100vh" 
        maxWidth="100%" 
        alignItems={"center"} 
        justifyContent={"center"} 
        
        gridColumn="2"
        >
            <Flex 
                        
                flex='1 1 40%'
                gridColumn="2"
                alignItems={"center"}
                justifyContent={"center"}
                w='100vmin'

                flexDirection="column"
                p={6}
                //borderRadius={8}
                            
            > 
           
           <Tabs w="100vmin" h="100vmin" position="relative" variant='soft-rounded' colorScheme="purple" size='md'>
            <TabList>
                <Tab>Top Artists</Tab>
                <Tab  _hover={{opacity:"0.75", background:"orange.100",color:"blackAlpha.800"}}>Top Tracks</Tab>
                <Tab>Top Genres</Tab>
            </TabList>
            <TabPanels>
                
                <TabPanel>
                <Card position="relative" w="100vmin" >
                <CardHeader>
                    <Heading size='md'>Client Report</Heading>
                </CardHeader>
                {renderTopArtists()}
                
                </Card>
                </TabPanel>



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
