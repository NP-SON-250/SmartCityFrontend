import React, { useState } from "react";
import "../navbar/navbar.css";
import { IoLogoSkype } from "react-icons/io";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
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
const Menu = () => (
  <>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="#">features</Link>
    </p>
    <p>
      <Link to="about">about</Link>
    </p>

    <p>
      <Link to="contact">Contact</Link>
    </p>
  </>
);

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = today.toLocaleString("default", { month: "long" });
var yyyy = today.getFullYear();

function Navbar() {
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 82) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  const role = localStorage.getItem("role");

  return (
    <div className={navbar ? "Navbar active" : "Navbar"}>
      <div className="Navbar-links">
        <Link to="/">
          <div className="Navbar-links_logo">
            <div>
              <IoLogoSkype className="sidebar__menu" />
            </div>
            <div>
              <h4 className="Logo_title">
                urvey<span>Matrix</span>
              </h4>
            </div>
          </div>
        </Link>
        <div className="Navbar-links_container">
          <Menu />
        </div>
        <div className="Navbar-links_Date">
          <div className="Navbar-links-Date_container">
            <div>
              <p>
                {mm} {dd}, {yyyy}
              </p>
            </div>
            <div>
              <p>Kigali-Rwanda</p>
            </div>
          </div>
          <div className="Navbar-links-Date_rect"></div>
        </div>
      </div>
      <div className="Navbar-sign">
        {role === "surveyor" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              // localStorage.removeItem("token");
              localStorage.clear();
              sessionStorage.clear();
              toast.success("Logout complete");

              setTimeout(() => {
                navigate("/signin");
              }, 3000);
            }}
          >
            Sign out
          </button>
        ) : (
          <button>
            <Link to="signin">Sign in</Link>
          </button>
        )}
      </div>
      <div className="Navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="Navbar-menu_container scale-up-center">
            <div className="Navbar-menu_container-links">
              <Menu />
              <div className="Navbar-menu_container-links-sign">
                <button>
                  <Link to="signin">Sign in</Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
