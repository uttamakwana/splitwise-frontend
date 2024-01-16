import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import './that-friend.css';

const ThatFriend = () => {
  const { friend } = useContext(Context);
  return (
    <>
      {friend && (
        <>
          <div className="friend-heading flex-between">
            <h3 className="clr-blue">{friend.name}</h3>
            <span className="bg-clr-black clr-white p-1 medium">
              {friend.amount}
            </span>
          </div>

          {friend?.transactions?.length > 0 ? (
            <p className="clr-blue mb-1 medium">No transactions found!</p>
          ) : (
            <div className="friends-transactions bg-clr-gray-4 pi-1 mb-1">
              {friend?.transactions?.map((transaction) => (
                <div className="p-1 br-5 bg-clr-white flex-between">
                  <span className="clr-black">{transaction.description}</span>
                  <span className="clr-blue medium">{transaction.share}₹</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ThatFriend;
