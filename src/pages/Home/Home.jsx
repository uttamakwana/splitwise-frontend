import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider.jsx";
import { Header, Hero, Navigation } from "../../components";
import "./home.css";
import axios from "axios";

const Home = () => {
  const { user, setUser } = useContext(Context);
  const [showFriends, setShowFriends] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.post("https://splitwise-n301.onrender.com/users/info", {
          id: user._id,
        });
        if (response.data) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [user._id, setUser]);

  return (
    <main className="home-page mh-100vh">
      <Header />
      <Hero />
      <Navigation />
    </main>
  );
};

export default Home;
