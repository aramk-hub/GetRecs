import React from 'react'
import {
    Link,
    Flex,
    Text,
    Icon,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import {useNavigate, NavLink as RouterLink} from 'react-router-dom'
export default function NavItem({ icon, title, active, navSize, href }) {


    const navigate = useNavigate();

    const handleLinkClick = () => {
        navigate(href);
    }

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="left">
                
                <Link
                    as={RouterLink}
                    
                    to={href}
                    backgroundColor={active && "purple.500"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', color: "purple.100" , backgroundColor: "purple.300" }}
                    w={navSize == "large" && "100%"}
                    h={navSize == "large" && "100%"}
                    
                >
                    <MenuButton maxW="75%" onClick={handleLinkClick}>
                        <Flex>
                            <Icon as={icon} fontSize="2.5vmin" hover="purple.100" color={active ? "purple.100" : "gray.400"} />
                            <Text 
                            fontSize="2vmin" 
                            ml={3} 
                            whileHover="purple.100" 
                            color={active ? "purple.100" : "gray.400"} 
                            display={navSize == "small" ? "none" : "flex"}>
                                {title}
                            </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}
