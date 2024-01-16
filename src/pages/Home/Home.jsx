import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider.jsx";
import { Header, Hero, Loader, Navigation } from "../../components";
import "./home.css";
import axios from "axios";

const Home = () => {
  const { user, setUser } = useContext(Context);
  const [showFriends, setShowFriends] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8080/users/info", {
          id: user._id,
        });
        if (response.data) {
          setUser(response.data.user);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [user._id, setUser]);

  return (
    <main className="home-page mh-100vh">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Hero />
          <Navigation />
        </>
      )}
    </main>
  );
};

export default Home;
