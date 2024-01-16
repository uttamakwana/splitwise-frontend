import React, { useContext, useState, useEffect } from "react";
import { twoLetter } from "../../utils/twoLetter";
import "./friend-card.css";
import axios from "axios";
import { Context } from "../../context/ContextProvider";

const FriendCard = ({ id, u }) => {
  const [send, setSend] = useState(false);
  const { user } = useContext(Context);
  let alreadyFriend = user.friends.find((fr) => fr.id === u._id);
  console.log(alreadyFriend);

  useEffect(() => {
    const sentRequests =
      JSON.parse(localStorage.getItem("sentFriendRequests")) || [];
    const isRequestSent = sentRequests.includes(u._id);
    if (isRequestSent) {
      setSend(true);
    }
  }, [u._id]);

  const sendFriendRequest = async (e) => {
    try {
      const response = await axios.post(
        "https://splitwise-n301.onrender.com/friends/send-request",
        {
          id,
          friend_id: u._id,
          status: "pending",
        }
      );

      if (response.data.friend) {
        setSend(true);
        const sentRequests =
          JSON.parse(localStorage.getItem("sentFriendRequests")) || [];
        localStorage.setItem(
          "sentFriendRequests",
          JSON.stringify([...sentRequests, u._id])
        );
        alert("Request sent successfully!");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setSend(true);
        const sentRequests =
          JSON.parse(localStorage.getItem("sentFriendRequests")) || [];
        localStorage.setItem(
          "sentFriendRequests",
          JSON.stringify([...sentRequests, u._id])
        );
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="friend-card p-1 br-10 flex-col gap-1 bg-clr-black">
      <div className="w80 h80 flex-center margin-auto br-50 bg-clr-white clr-black fs-2">
        {twoLetter(u.name)}
      </div>
      <p className="bold clr-white text-center">{u.name}</p>
      <button
        className={`p-1 b-none br-5 medium cursor-pointer ${
          alreadyFriend || send ? "bg-clr-blue clr-white disabled" : ""
        }`}
        onClick={(e) => sendFriendRequest(e)}
        disabled={alreadyFriend ? true : send ? true : false}
      >
        {alreadyFriend ? "Already Friend✅" : send ? "Sent✅" : "Add"}
      </button>
    </div>
  );
};

export default FriendCard;
