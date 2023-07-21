import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'
import {useNavigate} from 'react-router-dom'

export default function NavItem({ icon, title, description, active, navSize, href }) {


    const navigate = useNavigate();

    const handleLinkClick = (title) => {
        if (title === 'Logout') {
            window.localStorage.removeItem("token");
            navigate('/');
            return null;
        }
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
                    onClick={handleLinkClick(title)}
                    href={href}
                    backgroundColor={active && "purple.500"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "purple.300" }}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "purple.100" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}
