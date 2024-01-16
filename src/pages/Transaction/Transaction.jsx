import React, { useContext, useState } from "react";
import "../styles.css";
import axios from "axios";
import "./transaction.css";
import { Context } from "../../context/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import { Header, Loader } from "../../components/index.js";
import toast, { Toaster } from "react-hot-toast";

const Transaction = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [friends, setFriends] = useState(user?.friends || []);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [paidFor, setPaidFor] = useState([]);
  const [wantToSplit, setWantToSplit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      setFriends(user?.friends || []);
    } else {
      const filteredFriends = user?.friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm)
      );
      setFriends(filteredFriends);
    }
  };

  const addFriendsTransaction = (e, friend) => {
    e.preventDefault();
    const selectedFriendsShare = document.querySelector(
      "#selected-friend-share"
    );
    const selectedFriendsDescription = document.querySelector(
      "#selected-friend-description"
    );
    if (!selectedFriendsDescription.value || !selectedFriendsShare.value) {
      alert("Please enter required value!");
      return selectedFriendsShare.focus();
    }

    setPaidFor([
      ...paidFor,
      {
        id: selectedFriend.id,
        name: selectedFriend.name,
        share: selectedFriendsShare.value,
        description: selectedFriendsDescription.value,
      },
    ]);

    selectedFriendsShare.value = "";
    selectedFriendsDescription.value = "";
    setSelectedFriend("");
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const amount = document.querySelector("#main-amount");
    const description = document.querySelector("#main-description");

    if (!amount.value || !description.value) {
      alert("Please enter required details!");
      return amount.focus();
    }

    if (paidFor?.length) {
      try {
        const response = await axios.post(
          "https://splitwise-n301.onrender.com/transactions/make",
          {
            id: user._id,
            amount: amount.value,
            description: description.value,
            isPersonalExpense: !wantToSplit,
            paidBy: user._id,
            paidFor,
          },
          { withCredentials: true }
        );

        setPaidFor([]);
        console.log(response.data);

        if (response.data) {
          toast.success("Transaction added successfully!");
          // alert("Transaction added successfully!");
          setLoading(false);
          return navigate("/home");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    } else {
      console.log("first");
      const response = await axios.post(
        "https://splitwise-n301.onrender.com/transactions/make",
        {
          id: user._id,
          amount: amount.value,
          description: description.value,
          isPersonalExpense: !wantToSplit,
          paidBy: user._id,
          paidFor: [
            {
              id: user._id,
              name: user.name,
              share: amount.value,
              description: description.value,
            },
          ],
        },
        { withCredentials: true }
      );
      if (response.data) {
        toast.success("Transaction added successfully!");
        // alert("Transaction added successfully!");
        setLoading(false);
        return navigate("/home");
      }
    }
  };

  return (
    // transaction page
    <main className="transaction-page margin-auto mh-100vh">
     <div><Toaster /></div>
      {/* transaction Header */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="pi-1">
            <div className="transaction-page__header pb-2">
              <h1 className="extrabold flex-start clr-black">
                Add Transaction
              </h1>
              <p className="bold">Hey! {user?.name}👋</p>
              <p className="regular clr-gray-2">
                Make transaction or split bills{" "}
              </p>
            </div>
            {/* transaction Form */}
            <form
              action=""
              className="transaction-page__form mb-1 flex-col gap-1"
            >
              {/* Amount Group */}
              <div className="transaction-page__form__form-group form-group amount-group flex-col">
                <label
                  htmlFor="name"
                  className="form-group__label medium clr-black"
                >
                  Amount<span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  id="main-amount"
                  placeholder="0₹"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Description Group */}
              <div className="transaction-page__form__form-group form-group description-group flex-col">
                <label
                  htmlFor="description"
                  className="form-group__label medium clr-black"
                >
                  Description<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  id="main-description"
                  placeholder="e.g Buy at xyz stall for food!"
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Personal Expense Group */}
              {user?.friends?.length > 0 ? (
                <>
                  <div className="transaction-page__form__form-group form-group flex-start personal-group">
                    <input
                      type="checkbox"
                      name="personal"
                      id="transaction-personal"
                      placeholder="minimum 6 characters"
                      onClick={() => setWantToSplit(!wantToSplit)}
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="personal"
                      className="form-group__label bold ml-4"
                    >
                      Want to <span className="clr-blue">Split</span>?
                    </label>
                  </div>
                  {/* Select your friends */}
                  {wantToSplit && (
                    <div className="transaction-page__form__form-group form-group flex-col  select-friend-group">
                      <label
                        htmlFor="select-friend"
                        className="form-group__label"
                      >
                        Select Friends
                      </label>
                      <input
                        type="search"
                        name="search-friend"
                        id="search-friend"
                        placeholder="Search your friend"
                        onChange={handleSearch}
                      />
                      {/* searched friend */}
                      <div className="flex gap-1 ox-scroll mb-8">
                        {friends.map((friend) => (
                          <div
                            key={friend.id}
                            className="p-8 bg-clr-gray-3 br-1 cursor-pointer medium clr-gray-1 box-shadow-1"
                            onClick={() => setSelectedFriend(friend)}
                          >
                            {friend.name}
                          </div>
                        ))}
                      </div>
                      {selectedFriend && (
                        <div className="selected-friend p-1 bg-clr-gray-4 br-5">
                          <div className="form-group flex-col">
                            <div className="flex-between">
                              <label htmlFor="selected-friend-share">
                                Share of{" "}
                                <span className="bold">
                                  {selectedFriend.name}
                                </span>
                              </label>
                              <span
                                className="bold clr-blue cursor-pointer"
                                onClick={() => setSelectedFriend("")}
                              >
                                X
                              </span>
                            </div>
                            <input
                              type="number"
                              name="selected-friend-share"
                              id="selected-friend-share"
                              placeholder="0₹"
                            />
                          </div>
                          <div className="form-group flex-col mt-8">
                            <label htmlFor="selected-friend-description">
                              Description for{" "}
                              <span className="bold">
                                {selectedFriend.name}
                              </span>
                            </label>
                            <input
                              type="text"
                              name="selected-friend-description"
                              id="selected-friend-description"
                              placeholder={`e.g I have brought xyz for ${selectedFriend.name}`}
                            />
                          </div>
                          <div className="form-group mt-8">
                            <button
                              title="Add Friend"
                              className="bg-clr-gray-1 clr-white"
                              onClick={(e) =>
                                addFriendsTransaction(e, selectedFriend)
                              }
                            >
                              Add Friend
                            </button>
                          </div>
                        </div>
                      )}
                      {/* <select
            name="select-friend"
            id="select-friend"
            multiple
            onChange={(e) => {
              console.log(friends);
              setFriends([...friends, e.target.value]);
            }}
          >
            {user?.friends.map((friend) => (
              <option value={friend.id} key={friend.id}>
                {friend.name}
              </option>
            ))}
          </select> */}
                      {/* <div className="mt-8 friends-container">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((e, key) => (
              <div className="box br-5 p-1" key={key}>
                {e}
              </div>
            ))}
          </div> */}
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
              <div className="transaction-page__form__form-group form-group button-group">
                <button
                  title="transaction"
                  className="bg-clr-blue clr-white bold"
                  onClick={handleTransaction}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default Transaction;
