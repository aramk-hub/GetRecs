import React, { useState, useEffect, Fragment } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    FormHelperText
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiUser,
    FiSettings,
    FiLogOut,
    FiSearch,
    FiHelpCircle
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import axios from 'axios'

export default function Sidebar() {               
    const [navSize, changeNavSize] = useState("small");
    const [user, setUser] = useState([]);
    const token = window.localStorage.getItem("token");

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

    console.log(user);
    
    return (
        <Flex
            float="left"
            gridColumn="1"
            gridTemplateColumns="1 fr 1fr"
            pos="fixed"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            maxW={navSize == "small" ? "10%" : "200px"}
            minW={navSize == "small" ? "5%" : "10%"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    fontSize="2.5vmin"
                    color="gray.400"
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={FiSearch} title="Search" active href="/search"/>
                <NavItem navSize={navSize} icon={FiLogOut} title="Logout" href="/logout"/>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                
                <Fragment>
                    {console.log(user)}
                <Avatar maxH="4vmin" maxW="4vmin" src={(user.images === undefined || user.images.length == 0) ? "avatar-1.jpg" : (user.images[0] ? user.images[0].url : "avatar-1.jpg")} />
                <Flex flexDir="column" ml={2} display={navSize === "small" ? "none" : "flex"}>
                    <Heading color="gray.400" fontSize="2vmin" as="h3" size="sm">{user.display_name}</Heading>
                </Flex>
                
                </Fragment>
                
                </Flex>
                
            </Flex>
        </Flex>
    )
}
