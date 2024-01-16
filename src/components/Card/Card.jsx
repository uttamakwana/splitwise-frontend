import React, { useContext } from "react";
import { twoLetter } from "../../utils/twoLetter";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Card = ({ friend }) => {
  const navigate = useNavigate();
  const { setFriend } = useContext(Context);

  return (
    <div
      className="my-friend-card flex-col bg-clr-gray-4 gap-8 p-8 br-5"
      onClick={() => {
        setFriend(friend);
        navigate("/that-friend");
      }}
    >
      <div className="w80 h80 bg-clr-blue margin-auto clr-white flex-center br-50 medium">
        {twoLetter(friend.name)}
      </div>
      <h3 className="text-center">{friend.name}</h3>
      <div className="p-1 bold bg-clr-blue clr-white br-5 flex-center mx-width-220 w100 margin-auto">
        {friend.amount}
      </div>
    </div>
  );
};

export default Card;
