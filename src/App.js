import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Create, Home, Login, VideoPin } from "./components";
import { fetchUser, userAccessToken } from "./utils/fetchUser";

const App = () => {
  const [user, setUser] = useState(null);
  const [feeds, setFeeds] = useState(null);
  const [internalSearch, setInternalSearch] = useState("");
  const [likes, setLikes] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const accessToken = await userAccessToken();
        if (!accessToken) {
          navigate("/login");
        } else {
          const [userInfo] = await fetchUser();
          if (isMounted) {
            setUser(userInfo);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const getFilteredProducts = () => {
    if (!internalSearch) return feeds;
    return feeds.filter((data) =>
      data.title.toLowerCase().includes(internalSearch.toLowerCase())
    );
  };

  return (
    <Routes>
      <Route path="login" element={<Login setUser={setUser} />} />
      <Route
        path="/*"
        element={
          <Home
            user={user}
            feeds={feeds}
            setFeeds={setFeeds}
            internalSearch={internalSearch}
            setInternalSearch={setInternalSearch}
            getFilteredProducts={getFilteredProducts}
            // likes={likes}
            // likes={likes}
            // handleLike={handleLike}
          />
        }
      />
      <Route path="/videoDetail" element={<VideoPin />} />
      {/* <Route path="/videoDetail" element={<VideoDetail />} /> */}
    </Routes>
  );
};

export default App;
