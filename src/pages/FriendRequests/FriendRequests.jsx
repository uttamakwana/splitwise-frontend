import React, { useContext } from "react";
import { Header, FriendRequestCard } from "../../components";
import { Context } from "../../context/ContextProvider";

const FriendRequests = () => {
  const { user } = useContext(Context);
  return (
    <div className="friend-requests-page">
      <Header />
      <div className="show-friend-requests flex-col pi-1">
        {user?.friendRequests &&
          user.friendRequests.map((friendRequest) => (
            <FriendRequestCard
              id={user._id}
              request={friendRequest}
              key={friendRequest._id}
            />
          ))}
      </div>
    </div>
  );
};

export default FriendRequests;
