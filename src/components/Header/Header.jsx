import React, { useContext } from "react";
import Navigation from "../Navigation/Navigation";
import { Context } from "../../context/ContextProvider";
import { twoLetter } from "../../utils/twoLetter.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="home-page__header bg-clr-black top-sticky">
      <div className="home-page__header p-1 bg-clr-black flex-between">
        <h1 className="clr-white cursor-pointer" onClick={() => navigate("/")}>
          <span className="extra-bold clr-blue">SplitWise🚀</span>
        </h1>
        <div className="flex-center bg-clr-gray-3 w40 h40 br-50 ar1 cursor-pointer">
          {twoLetter(user?.name)}
        </div>
      </div>
    </div>
  );
};

export default Header;
