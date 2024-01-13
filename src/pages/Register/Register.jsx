import React, { useContext, useState } from "react";
import "../styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = document.querySelector("#register-name");
    const email = document.querySelector("#register-email");
    const number = document.querySelector("#register-number");
    const password = document.querySelector("#register-password");
    const confirmPassword = document.querySelector(
      "#register-confirm-password"
    );
    if (
      !name.value ||
      !email.value ||
      !number.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      alert("Please enter all the details!");
      return name.focus();
    }

    if (password.value !== confirmPassword.value) {
      password.value = "";
      confirmPassword.value = "";
      alert("Please enter the same password!");
      return password.focus();
    }

    try {
      const response = await axios.post("https://splitwise-n301.onrender.com/users", {
        name: name.value,
        email: email.value,
        number: number.value,
        password: password.value,
      });

      if (response.data.user) {
        setUser(response.data.user);
        alert("Registration successful!");
        navigate("/home");
      }
    } catch (error) {
      alert(error.response?.data?.message);
      console.log(error);
    }
  };
  return (
    // Register page
    <main className="register-page">
      <div className="register-page-left"></div>
      <div className="register-page-right">
        {/* Register Header */}
        <div className="register-page__header">
          <h1 className="extrabold flex-start clr-black">Register</h1>
          <p className="regular clr-gray-2">
            Become a part of the <span className="clr-gray-1">Splitwise</span>{" "}
            app
          </p>
        </div>
        {/* Register Form */}
        <form className="register-page__form mb-1 flex-col gap-1">
          {/* Name Group */}
          <div className="register-page__form__form-group form-group name-group flex-col">
            <label
              htmlFor="name"
              className="form-group__label medium clr-black"
            >
              Name<span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="register-name"
              placeholder="e.g. First Name"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Email Group */}
          <div className="register-page__form__form-group form-group email-group flex-col">
            <label
              htmlFor="email"
              className="form-group__label medium clr-black"
            >
              Email<span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="register-email"
              placeholder="abc@email.com"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Number Group */}
          <div className="register-page__form__form-group form-group number-group flex-col">
            <label
              htmlFor="number"
              className="form-group__label medium clr-black"
            >
              Number<span className="required">*</span>
            </label>
            <input
              type="number"
              name="number"
              id="register-number"
              placeholder="10 digit number"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password Group */}
          <div className="register-page__form__form-group form-group flex-col password-group">
            <label htmlFor="password" className="form-group__label">
              Password<span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="minimum 6 characters"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*Confirm Password Group */}
          <div className="register-page__form__form-group form-group flex-col  password-group">
            <label htmlFor="confirm-password" className="form-group__label">
              Confirm Password<span className="required">*</span>
            </label>
            <input
              type="password"
              name="confirm-password"
              id="register-confirm-password"
              placeholder="write the same password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Register Button */}
          <div className="register-page__form__form-group form-group button-group">
            <button
              title="register"
              className="bg-clr-blue clr-white"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
        {/* Register Footer */}
        <div className="register-page__footer">
          <p
            className="text-center medium clr-blue fs-14 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Already have an account!
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
