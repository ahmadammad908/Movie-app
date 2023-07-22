import React, { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { firebaseApp } from "../firebase-config";
// import Filter from "../FilterCatgeory/Filter";

import { getAllFeeds, categoryFeeds } from "../utils/fetchData";

import Spinner from "./Spinner";
import {
  Flex,
  SimpleGrid,
  MenuItem,
  color,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Select,
  IconButton,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import VideoDetail from "./VideoDetail";
import NotFound from "./NotFound";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import notFoundSvg from "../img/notfound.svg";
import { db } from "../firebase-config";
// import Filter from "../FilterCatgeory/Filter";
import Animation from "../Animation";
import useGroducts from "../product/useGroducts";
import { useSelector } from "react-redux";

import { FaBeer } from "react-icons/fa";

const Feed = ({ setFeeds, feeds, getFilteredProducts, user }) => {
  const fireStoreDb = getFirestore(firebaseApp);
  // const [feeds, setFeeds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [internalSearch, setInternalSearch] = useState("");

  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);
  const { getCategories } = useGroducts();
  const { categories, state } = useSelector((state) => state.categories);
  useEffect(() => {
    getCategories({});
  });
  // useEffect(() => {
  //   categoryFeeds({});
  // });

  // console.log("hello", { state });

  // console.log(feeds);
  useEffect(() => {
    setIsLoading(true);
    if (category) {
      categoryFeeds(fireStoreDb, category).then((data) => {
        setFeeds(data);
        setIsLoading(false);
      });
    } else {
      getAllFeeds(fireStoreDb).then((data) => {
        setFeeds(data);
        setIsLoading(false);
      });
    }

    // console.log(feeds);
  }, [category]);

  if (isLoading)
    return (
      <div>
        <Animation msg={"Loading your feeds"} />
      </div>
    );
  if (!feeds?.length > 0)
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "red", fontSize: "3em" }}>
          please Check Your Internet Connection :)
        </h1>
      </div>
    );

  return (
    <>
      <SimpleGrid
        minChildWidth="300px"
        autoColumns={"max-content"}
        spacing="20px"
        style={{ backgroundColor: "black" }}
        padding={"20px"}
        width={"full"}
        px={2}
        className="myImage"
        overflowX="hidden"
      >
        <div
          style={{
            position: "absolute",
            top: "7em",
          }}
        >
          <Select
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ border: "5px solid #141414", color: "gray" }}
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        {/* <InputGroup mx={6} width="60vw">
          <InputLeftElement
            pointerEvents="none"
            children={<IoSearch fontSize={25} />}
          />
          <Input
            type="text"
            placeholder="Search..."
            value={internalSearch}
            onChange={(e) => setInternalSearch(e.target.value)}
            fontSize={18}
            fontWeight="medium"
            variant={"filled"}
            // onFocus={() => navigate("/search")}
          />
        </InputGroup>
         */}

        {getFilteredProducts().length === 0 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10em",
              }}
            >
              <h1
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                No Results Found
              </h1>
            </div>
          </>
        )}
        {getFilteredProducts().map((data, likes, id) => (
          <VideoDetail
            maxWidth={420}
            key={data.id}
            data={data}
            likes={likes}
            id={id}
            user={user}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Feed;
