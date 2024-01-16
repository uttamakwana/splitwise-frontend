import React, { useContext } from "react";
import { twoLetter } from "../../utils/twoLetter";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const FriendRequestCard = ({ id, request }) => {
  const { setUser } = useContext(Context);

  const acceptFriendRequest = async (e) => {
    try {
      const response = await axios.post(
        "https://splitwise-n301.onrender.com/friends/accept-request",
        { id, friend_id: request.id },
        { withCredentials: true }
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
  const removeFriendRequest = async (e) => {
    try {
      const response = await axios.post(
        "https://splitwise-n301.onrender.com/friends/deny-request",
        { id, friend_id: request.id },
        { withCredentials: true }
      );

      if (response?.data?.success) {
        toast.success("Friend Request Denied!");
      }
    } catch (error) {
      toast.error("Some error happen!");
    }
  };

  return (
    <div className="friend-request-card flex-between p-8 br-10 bg-clr-gray-3 mt-8">
      <div>
        <Toaster />
      </div>
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
