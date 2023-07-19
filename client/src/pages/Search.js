import React from "react";
import {
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
    FiDisc,
    FiHome,
    FiUsers,
    FiSettings,
    FiLogOut,
    FiSearch
} from 'react-icons/fi'

import { useState, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import SignIn from './SignIn';
import './search.css'


 
const Search = () => {

    const [select,setSelect]= useState();
    const formBackground = useColorModeValue('gray.100', 'gray.700');

    const artistOrAlbum = (e) => {
        console.log("HELLOOOOOO");
        setSelect(e.target.value);
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
                                <Select h='40px' w='300px' mb={3} placeholder="Search by..." onChange={artistOrAlbum}>
                                    <option value='artists'>Artists</option>
                                    <option value='albums'>Albums</option>
                                </Select>
                                {select === 'artists' ? 
                                    <InputGroup w='300px'>
                                        <InputLeftElement pointerEvents='none'>
                                        <Icon as={FiUsers} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input placeholder='The Beatles, Pink Floyd' />
                                    </InputGroup>
                                    : (select === 'albums') ?
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                        <Icon as={FiDisc} color={"gray.500"} />
                                        </InputLeftElement>
                                        <Input placeholder='Abbey Road, Bleach' />
                                    </InputGroup>
                                    :
                                    null
                                }
                            </Fragment>
                        </VStack>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
};
 
export default Search;