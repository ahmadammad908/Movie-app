import { Flex, border } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Category, Create, Feed, NavBar, Profile, Search, VideoPin } from ".";
// import { categories } from "../categories/categoriesSlice";
// import { useSelector } from "react-redux";
// import useGroducts from "../product/useGroducts";
// import Filter from "../FilterCatgeory/Filter";

const Home = ({
  user,
  feeds,
  setFeeds,
  getFilteredProducts,
  internalSearch,
  setInternalSearch,
}) => {
  // const [feeds, setFeeds] = useState(null);
  // const [internalSearch, setInternalSearch] = useState("");

  // function getFilteredProducts() {
  //   if (!internalSearch) return feeds;
  //   return feeds.filter((data) =>
  //     data.title.toLowerCase().includes(internalSearch.toLowerCase())
  //   );
  // }

  return (
    <>
      <div className="myImage" style={{ backgroundColor: "black" }}>
        <NavBar
          user={user}
          internalSearch={internalSearch}
          setInternalSearch={setInternalSearch}
        />

        {/* <Filter /> */}
        <Flex width={"full"}>
          <Flex
            direction={"column"}
            justifyContent="start"
            alignItems={"center"}
            width={20}
          >
            {/* <select
            style={{
              padding: "10px 20px",
              background: "#BD1CBD",
              color: "white",
              marginLeft: "40vh",
              borderRadius: "10px",
              outline: "none",
            }}
            id="search"
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option value={category.name}>{category.name}</option>
            ))}
          </select> */}
          </Flex>
          <Flex
            width={"full"}
            justifyContent="center"
            alignItems="center"
            px={4}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Feed
                    setFeeds={setFeeds}
                    feeds={feeds}
                    getFilteredProducts={getFilteredProducts}
                    user={user}

                    // getFilteredProducts={getFilteredProducts}
                  />
                }
              />
              <Route
                path="/category/:categoryId"
                element={
                  <Feed
                    setFeeds={setFeeds}
                    feeds={feeds}
                    // getFilteredProducts={getFilteredProducts}
                  />
                }
              />

              <Route path="/create" element={<Create />} />
              <Route
                path="/videoDetail/:videoId"
                element={<VideoPin user={user} />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Routes>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default Home;
