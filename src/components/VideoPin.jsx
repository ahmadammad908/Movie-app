import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import {
  Flex,
  Text,
  Box,
  Image,
  Button,
  Grid,
  GridItem,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcApproval } from "react-icons/fc";
import { IoTrash, IoDownload } from "react-icons/io5";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "../firebase-config";
import Anima from "../Anima";
import RecommendedFeeds from "./RecommendedFeeds";
import {
  deleteVideo,
  getSpecificVideo,
  getUserInfo,
  recommendedFeed,
} from "../utils/fetchData";
import { fetchUser } from "../utils/fetchUser";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const VideoPin = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.900", "gray.50");
  const { videoId } = useParams();
  const fireStoreDb = getFirestore(firebaseApp);
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);
  const user = fetchUser();
  const navigate = useNavigate();

  const playerRef = useRef();
  const playerContainer = useRef();

  useEffect(() => {
    if (videoId) {
      setIsLoading(true);
      getSpecificVideo(fireStoreDb, videoId).then((data) => {
        setVideoInfo(data);
        recommendedFeed(fireStoreDb, data.category, videoId).then((feed) => {
          setFeeds(feed);
        });
        getUserInfo(fireStoreDb, data.userId).then((user) => {
          setUserInfo(user);
          setIsLoading(false);
        });
      });
    }
  }, [videoId]);

  const deleteTheVideo = (videoId) => {
    setIsLoading(true);
    deleteVideo(fireStoreDb, videoId);
    navigate("/");
  };

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  if (isLoading) {
    return (
      <>
        <div style={{ paddingTop: "0em" }}>
          <Anima />
        </div>
        <div style={{ paddingTop: "10em", marginLeft: "-5em" }}>
          <h1 style={{ fontSize: "2em", color: "red" }}>Loading .... </h1>
        </div>
      </>
    );
  }

  return (
    <Flex
      width={"full"}
      height={"auto"}
      justifyContent="center"
      alignItems="center"
      direction={"column"}
      py={2}
      px={4}
    >
      <Flex
        alignItems="center"
        width={"full"}
        my={4}
        background={"#141414"}
        padding={"10px"}
        borderRadius={"20px"}
      >
        <Link to={"/"}>
          <img
            src={videoInfo?.thumbnail}
            width={"100px"}
            style={{ clipPath: "circle()" }}
          ></img>
        </Link>
        <Box width="1px" height="20px" bg={"gray.500"} mx={2}></Box>
        <Text
          isTruncated
          fontWeight="semibold"
          fontSize={20}
          style={{ color: "white" }}
        >
          {videoInfo?.title}
        </Text>{" "}
        🌐
      </Flex>

      <Grid gap={2} width="100%">
        <GridItem w="100%" colSpan={2}>
          <Flex
            width={"full"}
            bg="black"
            position={"relative"}
            ref={playerContainer}
          >
            <ReactPlayer
              url={videoInfo?.videoUrl}
              width="100%"
              height="100%"
              controls
              ref={playerRef}
            />
          </Flex>
          <h1 style={{ display: "flex", marginTop: "30px" }}>
            {/* <h1
              onClick={onLikeButton}
              style={{
                fontSize: "35px",
                cursor: "pointer",
              }}
            >
              ❤️
            </h1> */}
          </h1>

          {/* Description */}
          {videoInfo?.description && (
            <Flex
              my={6}
              direction="column"
              style={{
                color: "white",
                background: "#141414",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              <Text my={4} fontSize={25} fontWeight="semibold" color={"white"}>
                Description
              </Text>
              {HTMLReactParser(videoInfo?.description)}
            </Flex>
          )}
        </GridItem>
        <GridItem w="100%" h="10" colSpan={1}>
          {userInfo && (
            <Flex direction={"column"} width="full">
              <Flex alignItems={"center"} width="full">
                <Image
                  src={userInfo?.photoURL}
                  rounded="full"
                  width={"60px"}
                  height="60px"
                  minHeight={"60px"}
                  minWidth="60px"
                  shadow={"lg"}
                />

                <Flex direction={"column"} ml={3}>
                  <Flex alignItems={"center"}>
                    <Text
                      isTruncated
                      fontSize={20}
                      fontWeight="semibold"
                      style={{ color: "white" }}
                    >
                      {userInfo?.displayName}
                    </Text>
                    <FcApproval />
                  </Flex>
                  {videoInfo?.id && (
                    <Text fontSize={12} style={{ color: "white" }}>
                      {moment(
                        new Date(parseInt(videoInfo.id)).toISOString()
                      ).fromNow()}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Stack direction="row" justifyContent={"space-around"} mt={6}>
                {userInfo?.uid === user?.uid && (
                  <Popover closeOnEsc>
                    <PopoverTrigger>
                      <Button colorScheme={"red"} rounded="full" px={6}>
                        <IoTrash fontSize={20} color="#FFF" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to Delete it?
                        <Box my={2}>
                          <Button
                            colorScheme={"red"}
                            onClick={() => deleteTheVideo(videoId)}
                          >
                            Yes
                          </Button>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}

                <a
                  href={videoInfo.videoUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    rounded="full"
                    background={"red"}
                    my={2}
                    mt={"0"}
                    width="48"
                  >
                    <div style={{ fontSize: "18px", color: "white" }}>
                      <IoDownload />
                    </div>{" "}
                    <div
                      style={{
                        marginLeft: "10px",
                        color: "white",
                        marginTop: "1px",
                      }}
                    >
                      Download
                    </div>
                  </Button>
                </a>
              </Stack>
            </Flex>
          )}
        </GridItem>
      </Grid>
      {feeds && (
        <Flex
          direction={"column"}
          width="full"
          my={6}
          style={{ marginTop: "10em" }}
        >
          <Text my={4} fontSize={25} fontWeight="semibold" color={"white"}>
            Recommended <span style={{ color: "red" }}>Videos</span>
          </Text>

          <RecommendedFeeds feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
};

export default VideoPin;
