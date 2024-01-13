import React, { useContext, useState } from "react";
import "../styles.css";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(Context);
  const navigate = useNavigate();

  // function
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#login-email");
    const password = document.querySelector("#login-password");
    if (!email.value || !password.value) {
      alert("Please enter all the details!");
      return email.focus();
    }

    const response = await axios.post("https://splitwise-n301.onrender.com/users/login", {
      email: email.value,
      password: password.value,
    });
    console.log(response.data);
    console.log(response.data.user);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setUser(response.data.user);

    if (response.data.user) {
      alert("Login successful!");
      return navigate("/");
    }
  };

  return (
    // login page
    <main className="login-page">
      <div className="login-page-left"></div>
      <div className="login-page-right">
        {/* Login Header */}
        <div className="login-page__header mb-2">
          <h1 className="extrabold flex-start clr-black">Login</h1>
          <p className="regular clr-gray-2">
            Welcome to the <span className="clr-gray-1">Splitwise</span> app
          </p>
        </div>
        {/* Login Form */}
        <form action="" className="login-page__form mb-1 flex-col gap-1">
          {/* Email Group */}
          <div className="login-page__form__form-group form-group email-group flex-col">
            <label
              htmlFor="email"
              className="form-group__label medium clr-black"
            >
              Email<span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="abc@email.com"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password Group */}
          <div className="login-page__form__form-group form-group flex-col  password-group">
            <label htmlFor="password" className="form-group__label">
              Password<span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="minimum 6 characters"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Login Button */}
          <div className="login-page__form__form-group form-group keep-me-signed-in-group">
            <button
              title="Login"
              className="bg-clr-blue clr-white"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        {/* Login Footer */}
        <div className="login-page__footer">
          <p
            className="text-center medium clr-blue fs-14 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Don't have an account?
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
