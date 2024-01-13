import React, { useContext, useEffect, useState } from "react";
import { FriendCard, Header } from "../../components";
import "./all-users.css";
import axios from "axios";
import { Context } from "../../context/ContextProvider";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(Context);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("http://192.168.123.142:8080/users");
        if (response.data.users) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.log(error);
        // alert(error?.response?.data?.message);
      }
    };
    getAllUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      user._id !== u._id
  );

  return (
    <div className="all-users-page">
      <Header />
      <div className="users-search-group form-group pi-1 mx-375px margin-auto top-sticky-10vh bg-clr-white">
        <input
          type="search"
          name="search-user"
          id="search-user"
          placeholder="Search user by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {filteredUsers.length > 0 && (
        <div className="show-users mi-1 mt-8 p-8">
          {filteredUsers.map((u) =>
            user._id !== u.id ? (
              <FriendCard id={user._id} u={u} key={u._id} />
            ) : (
              ""
            )
          )}
        </div>
      )}
      {filteredUsers.length === 0 && (
        <p className="clr-gray-5 text-center">No matching users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
