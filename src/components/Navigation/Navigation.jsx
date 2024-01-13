import React, { useContext } from "react";
import { GiThreeFriends } from "react-icons/gi";
import { FaHistory, FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdLibraryAdd } from "react-icons/md";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Navigation = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list flex flex-wrap flex-center gap-1 bg-clr-black p-1">
        {/* My Friends */}
        <li
          className="main-navigation__list__item clr-white flex-col gap-8 flex-center"
          onClick={() => navigate("/friends")}
        >
          <div className="w40 h40 flex-center br-50 bg-clr-white clr-black">
            <GiThreeFriends />
          </div>
          <span className="ml-4">Friends</span>
        </li>
        {/* All Users */}
        <li
          className="main-navigation__list__item clr-white flex-col gap-8 flex-center"
          onClick={() => navigate("/all-users")}
        >
          <div className="w40 h40 flex-center br-50 bg-clr-white clr-black">
            <FaUsers />
          </div>
          <span className="ml-4">All Users</span>
        </li>
        {/* Pending Requst */}
        <li
          className="main-navigation__list__item clr-white flex-col gap-8 flex-center"
          onClick={() => navigate("/request")}
        >
          <div className="w40 h40 flex-center br-50 bg-clr-white clr-black">
            <FaUserPlus />
          </div>
          <span className="ml-4">Request</span>
        </li>
        {/* History */}
        <li
          className="main-navigation__list__item clr-white flex-col gap-8 flex-center"
          onClick={() => navigate("/history")}
        >
          <div className="w40 h40 flex-center br-50 bg-clr-white clr-black">
            <FaHistory />
          </div>
          <span className="ml-4">History</span>
        </li>
        {/* Add Transaction */}
        <li
          className="main-navigation__list__item clr-white flex-col gap-8 flex-center"
          onClick={() => navigate("/transaction")}
        >
          <div className="w40 h40 flex-center br-50 bg-clr-white clr-black">
            <MdLibraryAdd />
          </div>
          <span className="ml-4">Add Transaction</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
