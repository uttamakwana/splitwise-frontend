import React, { useContext, useState } from "react";
import "../styles.css";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { setUser, setToken } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // function

  const resetSentFriendRequests = () => {
    localStorage.setItem("sentFriendRequests", JSON.stringify([]));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = document.querySelector("#login-email");
    const password = document.querySelector("#login-password");
    if (!email.value || !password.value) {
      toast.error("Please enter all the details!");
      return email.focus();
    }

    try {
      const response = await axios.post(
        "https://splitwise-n301.onrender.com/users/login",
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      resetSentFriendRequests();
      setToken(response.data.token);

      if (response.data.user) {
        toast.success("Login successfull!");
        setLoading(false);
        return navigate("/home");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    // login page
    <main className="login-page">
      <div>
        <Toaster />
      </div>
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
            {loading ? (
              <Loader />
            ) : (
              <button
                title="Login"
                className="bg-clr-blue clr-white"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
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
