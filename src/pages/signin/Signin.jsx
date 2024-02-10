import React, { useState } from "react";
import "../signin/signin.css";
import Banner from "../../components/banner/Banner";
import { LuUsers2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const success = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
// sigin function
function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log({ email, password });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = () => {
    axios
      .post("http://localhost:2400/Smartbusiness/API/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.users.id);
        localStorage.setItem(
          "institutionId",
          response.data.users.institutionId
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.users.firstName);
        const { role } = response.data?.users;
        localStorage.setItem("role", role);
        if (role === "manager") {
          toast.success("Welcome admin");
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          toast.success("welcome surveyer");
          setTimeout(() => {
            navigate("/userhomepage");
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error("Incorrect email or password");
        console.error(error);
      });
  };

  return (
    <>
      <Banner title="Login" />
      <div className="login_container section__padding">
        <div className="login-wrap">
          <div className="icon">
            <LuUsers2 />
          </div>
          <h3>Sign in</h3>
          <form className="login-form">
            <div className="form-group">
              <input
                type="text"
                name="email"
                onChange={handleEmail}
                className="form-control rounded-left"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                onChange={handlePassword}
                className="form-control rounded-left"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group checkbox-container">
              <div className="w-50">
                <label className="checkbox-wrap checkbox-primary">
                  Remember Me
                  <input type="checkbox" />
                </label>
              </div>
              <div className="w-50">
                <Link to="/forgot-password"> Forgot Password</Link>
              </div>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary rounded submit p-3 px-5"
                onClick={handleApi}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Signin;
