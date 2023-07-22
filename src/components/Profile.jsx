import {
  Button,
  Flex,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoCloudUpload, IoHeart } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { IoSearch, IoLogOut } from "react-icons/io5";

import { firebaseApp } from "../firebase-config";
import { getUserInfo, userCreatedVideos } from "../utils/fetchData";
import RecommendedFeeds from "./RecommendedFeeds";
import Spinner from "./Spinner";
import Anima from "../Anima";
import NotFound from "../img/notfound.svg";
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const Profile = () => {
  const { userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const fireStoreDb = getFirestore(firebaseApp);

  useEffect(() => {
    setIsLoading(true);

    if (userId) {
      getUserInfo(fireStoreDb, userId).then((user) => {
        setUserInfo(user);
        setIsLoading(false);
      });
      userCreatedVideos(fireStoreDb, userId).then((data) => {
        setFeeds(data);
      });
    }
  }, [userId]);
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  if (isLoading)
    return (
      <div style={{ paddingTop: "10em" }}>
        <Anima />
      </div>
    );
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent="center"
        width={"full"}
        height="auto"
        p={2}
        direction="column"
      >
        <Flex
          justifyContent={"center"}
          width="full"
          position={"relative"}
          marginTop={"100px"}
          direction="column"
          alignItems={"center"}
        >
          {/* <Image
          src={randomImage}
          height={"320px"}
          width="full"
          objectFit={"cover"}
          borderRadius={"md"}
        /> */}
          <Image
            src={userInfo?.photoURL}
            border="5px solid  red"
            width="120px"
            objectFit={"cover"}
            // borderColor={"gray.100"}
            rounded="full"
            shadow={"lg"}
            mt="-16"
          />
          <h1 style={{ marginTop: "30px", color: "white" }}>
            {" "}
            <span style={{ color: " red" }}>Welcome</span>{" "}
            {userInfo?.displayName} :)
          </h1>
          <h3 style={{ marginTop: "30px", color: "white" }}>
            {""}

            {userInfo?.email}
          </h3>
          <div className="btn" style={{ color: "white" }}>
            <button
              className="btn1"
              onClick={logout}
              style={{ color: "white" }}
            >
              Logout <IoLogOut fontSize={20} className="log" />
            </button>
          </div>
        </Flex>

        {feeds && (
          <Flex direction={"column"} width="full" my={6}>
            <RecommendedFeeds feeds={feeds} />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Profile;
