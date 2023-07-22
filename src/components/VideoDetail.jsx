// In "VideoDetail.js"
import React, { useState, useEffect } from "react";
import {
  useColorMode,
  useColorModeValue,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { fetchUser } from "../utils/fetchUser";

const VideoDetail = ({ data }) => {
  const { colorMode } = useColorMode();
  const [userInfo, setUserInfo] = useState(null); // Store user information here
  const bg = useColorModeValue("blackAlpha.700", "gray.900");
  const textColor = useColorModeValue("gray.100", "gray.100");

  useEffect(() => {
    // Fetch user data when the component mounts
    const getUserData = async () => {
      const userData = await fetchUser();
      setUserInfo(userData);
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="cards">
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          direction={"column"}
          marginTop={"40px"}
          cursor={"pointer"}
          shadow={"lg"}
          _hover={{ shadow: "xl" }}
          rounded={"md"}
          overflow={"hidden"}
          position={"relative"}
          maxWidth={"300px"}
          background={"black"}
          backgroundImage={data.thumbnail}
          backgroundRepeat={"no-repeat"}
          backgroundPosition={"center"}
          backgroundSize={"cover"}
          objectFit={"contain"}
          height={"30vh"}
          className="card"
        >
          <Link to={`/videoDetail/${data.id}`}>
            <video
              // src={data.videoUrl}
              style={{ aspectRatio: "10/10" }}
              // onMouseOver={(e) => e.target.play()}
              // onMouseOut={(e) => e.target.pause()}
              // muted
            />
            <Flex
              position={"absolute"}
              bottom={0}
              left={0}
              p={2}
              bg={bg}
              width={"full"}
              direction="column"
            >
              <Flex
                width={"full"}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Text color={textColor} isTruncated fontSize={20}>
                  {data.title}
                </Text>
                <Text color={textColor} isTruncated fontSize={20}>
                  {data.location}
                </Text>
                {userInfo && (
                  <Image
                    src={userInfo?.photoURL}
                    rounded={"full"}
                    width={"50px"}
                    height={"50px"}
                    border={"2px"}
                    borderColor={bg}
                    mt={-10}
                  />
                )}
              </Flex>

              <Text fontSize={12} color={textColor} ml={"auto"}>
                {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
              </Text>

              {/* <i className={`fa fa-heart fa-lg`} /> */}
            </Flex>
          </Link>
        </Flex>
      </div>
    </>
  );
};

export default VideoDetail;
