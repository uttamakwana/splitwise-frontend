import React, { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="home-page__profile p-1 bg-clr-gray-5 flex-col gap-2">
      <div className="home-page__profile__name">
        <h1 className="clr-black">
          Welcome <span className="extra-bold clr-blue">{user.name}🚀</span>
        </h1>
        {/* <p className="medium">Email: {user.email}</p> */}
      </div>
      <div className="flex flex-wrap gap-1">
        <p
          className="regular bg-clr-blue p-8 br-5 clr-white flex-center cursor-pointer"
          onClick={() => navigate("/history")}
        >
          Transactions:
          <span className="bold ml-4">{user?.transactions?.length}</span>
        </p>
        <p
          className="regular bg-clr-blue p-8 br-5 clr-white flex-center cursor-pointer"
          onClick={() => navigate("/friends")}
        >
          Friends:
          <span className="bold ml-4">{user?.friends?.length}</span>
        </p>
        <p
          className="regular bg-clr-blue p-8 br-5 clr-white flex-center cursor-pointer"
          onClick={() => navigate("/request")}
        >
          Friend Requests:
          <span className="bold ml-4">{user?.friendRequests?.length}</span>
        </p>
        <p className="regular bg-clr-black p-8 br-5 clr-white flex-center">
          Your Expense:
          <span className="bold ml-4">{user?.personalTotalExpense}</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
