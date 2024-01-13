import React, { useContext } from "react";
import { twoLetter } from "../../utils/twoLetter";
import axios from "axios";
import { Context } from "../../context/ContextProvider";

const FriendRequestCard = ({ id, request }) => {
  const { setUser } = useContext(Context);

  const acceptFriendRequest = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.123.142:8080/friends/accept-request",
        { id, friend_id: request.id }
      );

      console.log(response);
      if (response.data.user) {
        setUser(response.data.user);
        alert("Friend Request Accepted Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeFriendRequest = (e) => {};

  return (
    <div className="friend-request-card flex-between p-8 br-10 bg-clr-gray-3 mt-8">
      <div className="friend-request-card-name flex-center">
        <div className="w40 h40 br-50 flex-center bg-clr-white">
          {twoLetter(request.name)}
        </div>
        <h4 className="ml-4 medium">{request.name}</h4>
      </div>
      <div className="friend-request-card-status flex gap-1">
        <div
          className="w40 h40 bg-clr-white br-50 flex-center medium cursor-pointer"
          onClick={removeFriendRequest}
        >
          ❌
        </div>
        <div
          className="w40 h40 bg-clr-white br-50 flex-center medium cursor-pointer"
          onClick={acceptFriendRequest}
        >
          ✔️
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
