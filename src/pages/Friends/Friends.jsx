import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import "./friends.css";
import { Card, Header } from "../../components";

const Friends = () => {
  const { user } = useContext(Context);

  return (
    <div className="friends-page">
      <Header />
      <h3 className="bold p-1">Friends</h3>
      <div className="list-of-friends grid-cols pi-1">
        {user?.friends &&
          user?.friends.map((friend) => (
            <Card friend={friend} key={friend.id} />
          ))}
      </div>
    </div>
  );
};

export default Friends;
