import React, { useContext } from "react";
import { Header, FriendRequestCard } from "../../components";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from 'react-router-dom';

const FriendRequests = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="friend-requests-page">
      <Header />
      <div className="show-friend-requests flex-col pi-1">
        {user?.friendRequests?.length > 0 ?
          user.friendRequests.map((friendRequest) => (
            <FriendRequestCard
              id={user._id}
              request={friendRequest}
              key={friendRequest._id}
            />
          )) : <>
           <div className="flex-col">
            <p className="text-center clr-blue medium mb-1 fs-1">
              No friends requests found!
            </p>
            <button
              onClick={() => navigate("/home")}
              className="p-1 margin-auto bg-clr-blue clr-white bold b-none cursor-pointer br-5 flex-center"
            >
              Home
            </button>
          </div>
          </>}
      </div>
    </div>
  );
};

export default FriendRequests;
