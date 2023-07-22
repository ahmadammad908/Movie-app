import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../img/logo.png";
import logoDark from "../img/logo_dark.png";
import Ahmad from "../img/Ahmad.png";

import { IoSearch, IoSunny, IoMoon, IoAdd, IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";

const NavBar = ({ user, internalSearch, setInternalSearch }) => {
  const bg = useColorModeValue("gray.600", "gray.300");
  const { toggleColorMode, colorMode } = useColorMode();
  const navigate = useNavigate;

  // const auth = getAuth();
  // const navigate = useNavigate();

  // const userlogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // console.log("Logout" + userlogout);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      width="100vw"
      p={4}
    >
      <Link to={"/"} style={{}}>
        <Image
          style={{}}
          className="image12"
          src="https://pngimg.com/d/netflix_PNG22.png"
          alt=""
          width={"190px"}
          height={"90px"}
        />
      </Link>

      <InputGroup mx={4} width="210vw">
        <InputLeftElement
          pointerEvents="none"
          children={<IoSearch fontSize={25} color="black" />}
        />
        <Input
          type="text"
          style={{ background: "white", color: "black" }}
          placeholder="Search..."
          fontSize={18}
          fontWeight="medium"
          variant={"filled"}
          value={internalSearch}
          border={"2px solid red"}
          onChange={(e) => setInternalSearch(e.target.value)}
          // onFocus={() => navigate("/search")}
        />
      </InputGroup>

      <Flex>
        {colorMode == "Dark" ? (
          <Flex onClick={toggleColorMode}>
            {/* <IoMoon fontSize={25} /> */}
          </Flex>
        ) : (
          <Flex
            width={"40px"}
            height={"40px"}
            justifyContent="center"
            alignItems={"center"}
            cursor={"pointer"}
            borderRadius="5px"
            // onClick={toggleColorMode}
          >
            {/* <IoSunny fontSize={25} /> */}
          </Flex>
        )}

        {/* <Link to={"/create"}>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            bg={bg}
            width="40px"
            height={"40px"}
            borderRadius="5px"
            mx={6}
            cursor="pointer"
            _hover={{ shadow: "md" }}
            transition="ease-in-out"
            transitionDuration={"0.3s"}
          >
            <div
              style={{
                color: "white",
                border: "none",
                padding: "6px",
                borderRadius: "50%",
                background: "#3BA3CD",
              }}
            >
              <IoAdd fontSize={"25"} />
            </div>
          </Flex>
        </Link> */}

        <Menu>
          <MenuButton>
            <Image src={user?.photoURL} width="60px" rounded={"full"} />
          </MenuButton>
          <MenuList shadow={"dark-lg"}>
            <Link to={`/profile/${user?.uid}`}>
              <MenuItem>My Account</MenuItem>
            </Link>
            {/* <MenuItem
              flexDirection={"row"}
              alignItems="center"
              gap={4}
              onClick={logout}
            >
              Log Out <IoLogOut fontSize={20} />{" "}
            </MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
