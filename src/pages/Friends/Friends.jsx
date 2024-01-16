import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import "./friends.css";
import { Card, Header } from "../../components";
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate("/all-users");

  return (
    <div className="friends-page">
      <Header />
      <h3 className="bold p-1">{user?.friends?.length > 0 ? Friends : ""}</h3>
      <div className="list-of-friends grid-cols pi-1 cursor-pointer">
        {user?.friends?.length > 0 ? (
          user?.friends &&
          user?.friends.map((friend) => (
            <Card friend={friend} key={friend.id} />
          ))
        ) : (
          <div className="flex-col">
            <p className="text-center clr-blue medium mb-1 fs-1">
              No friends found!
            </p>
            <button
              onClick={() => navigate("/all-users")}
              className="p-1 margin-auto bg-clr-blue clr-white bold b-none cursor-pointer br-5 flex-center"
            >
              Add Friends
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
