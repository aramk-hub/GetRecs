import React from 'react'
import {
    Container, 
    SimpleGrid,
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
    Stat,
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
    const [shortTopArtists, setShortTopArtists] = useState({});
    const [mediumTopArtists, setMediumTopArtists] = useState({});
    const [longTopArtists, setLongTopArtists] = useState({});
    const [shortTopTracks, setShortTopTracks] = useState({});
    const [mediumTopTracks, setMediumTopTracks] = useState({});
    const [longTopTracks, setLongTopTracks] = useState({});    
    // const [shortTopGenres, setShortTopGenres] = useState({});
    // const [mediumTopGenres, setMediumTopGenres] = useState({});
    // const [longTopGenres, setLongTopGenres] = useState({});  
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

    function isEmpty(obj) {
        for (const prop in obj) {
          if (Object.hasOwn(obj, prop)) {
            return false;
          }
        }
      
        return true;
    }

    const getTopGenres = (range) => {
            
        var topArtists = {};
        if (range == "short_term") {
            topArtists = shortTopArtists;
        }else if (range == "medium_term") {
            topArtists = mediumTopArtists;
        }else {
            topArtists = longTopArtists;
        }
        if (!isEmpty(topArtists)) {
        var mp = new Map();

        topArtists.forEach(artist => {
            for (let i = 0; i < artist.genres.length; i++) {
                var genre = artist.genres[i]
                if (mp.has(genre)) {
                    mp.set(genre, mp.get(genre) + 1)
                } else {
                    mp.set(genre, 1)
                }
            }
        });


        const mpsorted = new Map([...mp.entries()].sort((a,b) => b[1] - a[1]))

        return mpsorted
    }
}

    const renderArtists = (range) => {
        var topArtists = {}
        if (range == "short") {
            topArtists = shortTopArtists;
        } else if (range == "medium") {
            topArtists = mediumTopArtists;
        } else {
            topArtists = longTopArtists;
        }
        console.log("renderArtists: " + isEmpty(topArtists))
        if (!isEmpty(topArtists)) {
        return (<Fragment>
        <CardBody w="100%" h="100%">
            <Stack divider={<StackDivider opacity="%"/>} spacing='2'>
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
        console.log("renderTracks: " + isEmpty(topTracks))
        if (!isEmpty(topTracks)) {
        return (<Fragment>
        <CardBody w="100%" h="100%">
            <Stack divider={<StackDivider opacity="10%" />} spacing='2'>
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

    const renderGenres = (range) => {
        var topTracks = {}
        if (range == "short") {
            topTracks = shortTopTracks;
        } else if (range == "medium") {
            topTracks = mediumTopTracks;
        } else {
            topTracks = longTopTracks;
        }

        var topGenres = {}
        if (range == "short") {
            topGenres = getTopGenres("short_term");;
        } else if (range == "medium") {
            topGenres = getTopGenres("medium_term");;
        } else {
            topGenres = getTopGenres("long_term");;
        }

        console.log("renderGenres: " + isEmpty(topGenres))
        console.log(topGenres)
        if (topTracks && topGenres) {
           
            var count = 0;
            return (<Fragment>
            <CardBody w="100%" h="100%">
                <Stack divider={<StackDivider opacity="10%"/>} spacing='2'>
                {Array.from(topGenres, ([key, value]) => {
                    if (count < 10) {
                    count++;
                    
                return (<Box maxHeight="90%">
                    {/* <Link target="_blank" href={artist.external_urls.spotify}>
                    <Image  float="right" height='7vmin' width='7vmin' src={artist.images[0].url}/>
                    </Link> */}
                    <Heading float="right" fontSize="2vmin"> {value}%</Heading>
                    <Heading fontSize="2vmin"><b> {count}. </b> &nbsp; 
                    {key = key.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                     &nbsp;</Heading> 
                    
                    
                </Box>)}})}
                </Stack>
            </CardBody>
            </Fragment>)} 
        }
        // var topGenres = {}
        // if (range == "short") {
        //     topGenres = shortTopGenres;
        // } else if (range == "medium") {
        //     topGenres = mediumTopGenres;
        // } else {
        //     topGenres = longTopGenres;
        // }
        // // let sum = 0;
        // // if (topGenres.size > 0) {
            
        // //     for (let key in topGenres) {
        // //     sum += topGenres[key];
        // //     }
        // // }
        // // const stats = [
        // //     { label: 'Favorite Genre', value: Array.from(topGenres.keys())[0].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') },
        // //     { label: 'Frequency Picked', value: topGenres.get(Array.from(topGenres.keys())[0]) / sum * 100 },
        // //     // { label: 'Avg. Click Rate', value: '12.87%' },
        // //   ]
          
          
        // // {<Box as="section" py={{ base: '4', md: '8' }}>
        // //     <Container>
        // //     <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
        // //         {stats.map(({ label, value }) => (
        // //         <Stat key={label} label={label} value={value} />
        // //         ))}
        // //     </SimpleGrid>
        // //     </Container>
        // // </Box>}
          


        
        
        
    


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
                maxHeight="100%"
                p={4}
                //borderRadius={8}     
            > 

            
            <Card style={{ border: "none", boxShadow: "none" }} background="rgba(204, 204, 204, 0.0)" flexDirection="column" position="relative" maxW="100%" height="100%">
                
            <Tabs isFitted w="100%" h="100%" position="relative" colorScheme="purple" size='md'>
                
            <TabList>
                <Tab fontSize="2vmin" color="black" _hover={{color: "teal.300" }}>Top Artists</Tab>
                <Tab fontSize="2vmin" color="black" _hover={{color: "teal.300" }}>Top Tracks</Tab>
                <Tab fontSize="2vmin" color="black"_hover={{color: "teal.300" }}>Top Genres</Tab>
            </TabList>
            <div className="transition"></div>
            
            <TabPanels>
                <TabPanel>
                <Tabs style={{transition:"margin 0.5s ease"}} isFitted position="relative" variant='enclosed' size='md'>
                <TabList>
                    

                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>Last 4 Weeks</Tab>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>Last 6 Months</Tab>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>All-Time</Tab>
                </TabList>
                <TabPanels>
                

                    {/* short term */}
                    
                    <TabPanel >
                        <div className='example-style'>
                        {renderArtists("short")}
                        </div>
                    </TabPanel>

                    {/* medium term */}
                    <TabPanel >
                    <div className='example-style'>
                        {renderArtists("medium")}
                        </div>
                    </TabPanel>

                    {/* long term */}
                    <TabPanel >
                    <div className='example-style'>
                        {renderArtists("long")}
                        </div>
                    </TabPanel>
                    
                </TabPanels>
                </Tabs>
                </TabPanel>

                <TabPanel>
                <Tabs isFitted position="relative" variant='enclosed' size='md'>
                <TabList>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>Last 4 Weeks</Tab>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>Last 6 Months</Tab>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>All-Time</Tab>
                </TabList>
                <TabPanels>
                

                    {/* short term */}
                    <TabPanel>
                        <div className='example-style'>
                        {renderTracks("short")}
                        </div>
                    </TabPanel>

                    {/* medium term */}
                    <TabPanel>
                        <div className='example-style'>
                        {renderTracks("medium")}
                        </div>
                    </TabPanel>

                    {/* long term */}
                    <TabPanel>
                        <div className='example-style'>
                        {renderTracks("long")}
                        </div>
                    </TabPanel>
                </TabPanels>
                </Tabs>
                </TabPanel>

                <TabPanel>
                <Tabs isFitted position="relative" variant='enclosed' colorScheme="purple" size='md'>
                <TabList>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>Last 4 Weeks</Tab>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>Last 6 Months</Tab>
                    <Tab color="black" fontSize="2vmin" _hover={{color: "purple.400" }}>All-Time</Tab>
                </TabList>
                <TabPanels>
                

                    {/* short term */}
                    <TabPanel>
                        <div className='example-style'>
                        {renderGenres("short")}
                        </div>
                    </TabPanel>

                    {/* medium term */}
                    <TabPanel>
                        <div className='example-style'>
                        {renderGenres("medium")}
                        </div>
                    </TabPanel>

                    {/* long term */}
                    <TabPanel>
                        <div className='example-style'>
                        {renderGenres("long")}
                        </div>
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
