import { useEffect, useState } from "react";
import {
  Home,
  Login,
  Register,
  Transaction,
  History,
  Friends,
  FriendRequests,
  AllUsers,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Loader } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/request" element={<FriendRequests />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/history" element={<History />} />
        {/* <Route path="/loader" element={<Loader />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
