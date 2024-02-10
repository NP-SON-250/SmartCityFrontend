import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log({ email, password });
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = () => {
    axios
      .post("https://node-app-plsi.onrender.com/api/klab/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const { role } = response.data?.users;
        console.log("role", response.data?.users.role);

        if (role === "admin") {
          toast("Welcome Admin");
          sessionStorage.setItem("token", response.data.token);
          setTimeout(() => {
            navigate("/Viewblog");
          }, 2000); // Navigate after showing the success message for 1 second
        } else {
          alert("Welcome User");
          sessionStorage.setItem("token", response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        alert("Incorrect email or password");
        console.error(error);
      });
  };

  return (
    <div className="sign-in">
      <div>
        <ToastContainer />
      </div>
      <h6 className="login-here">LOGIN HERE</h6>
      <form action="#" className="login-form">
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          className="input-login"
          placeholder="Enter Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          className="input-login"
          placeholder="Enter password"
        />

        <button className="login-button" onClick={handleApi}>
          Login
        </button>
        <h2 className="dont-have-account">Don't have account?</h2>
        <ul>
          <Link to="/signup" className="register">
            Register
          </Link>
        </ul>
      </form>
    </div>
  );
};

export default Signin;
