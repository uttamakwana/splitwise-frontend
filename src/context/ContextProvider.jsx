import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  const [friend, setFriend] = useState();
  return (
    <Context.Provider
      value={{ user, setUser, token, setToken, friend, setFriend }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
