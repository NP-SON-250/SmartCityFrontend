import React, { useState, useEffect, useRef } from "react";
import "../topbar/topbar.css";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
// ---------------------------------------------------------
import { MdDashboard } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { ImFilesEmpty } from "react-icons/im";
import { HiOutlineUsers } from "react-icons/hi";
import { FaUniversity } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { CgComponents } from "react-icons/cg";
// ---------------------------------------------------------
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";

function Topbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { loggedUser } = React.useContext(AppContext);

  const handleopenprofile = () => {
    setOpen(!open);
    console.log("open", open);
  };
  const handleopenmenu = () => {
    setOpenMenu(!openMenu);
    console.log("openMenu", openMenu);
  };

  let menuRef = useRef();
  let menuRefTwo = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      } else if (!menuRefTwo.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="topbar__container">
      <div className="topbar__content">
        <div className="topbar__search">
          <input type="text" placeholder="Search here..." />
          <IoSearchOutline className="topbar__icon" />
        </div>
        <div className="topbar__right">
          <div className="notify-container-icons">
           
          </div>
          <div className="topbar__profile" onClick={handleopenprofile}>
            <img
              src={loggedUser?.profile}
              className="topbar__profilepic"
              alt=""
            />
          </div>
          <div className="humberger" onClick={handleopenmenu} ref={menuRefTwo}>
            <FiMenu className="responsive__icon" />
          </div>
        </div>
        <div
          className={`dropdown__menu ${open ? "active" : "inactive"}`}
          ref={menuRef}
        >
          <h3>{loggedUser?.firstName + " " + loggedUser?.lastName}</h3>
          <div className="dropdown__underline"></div>
          <div className="dropdown__content">
            <ul onClick={handleopenprofile}>
              <DropDownItem
                icon={<FaRegUser />}
                text="Profile"
                href="/profile"
              />
              <DropDownItem
                icon={<IoMdSettings />}
                text="Settings"
                href="/settings"
              />
              <li
                className="dropdownitem"
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  navigate("/signin");
                }}
              >
                <CiLogout />
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`dropdown__menu__nav ${openMenu ? "active" : "inactive"}`}
          // ref={menuRef}
        >
          <h3>Smart city</h3>
          <div className="dropdown__underline"></div>
          <div className="dropdown__content__menu">
            <ul onClick={handleopenmenu}>
              <DropDownMenu
                icon={<MdDashboard />}
                text="Dashboard"
                href="/dashboard"
              />
              <DropDownMenu
                icon={<MdOutlineCreateNewFolder />}
                text="Survey"
                href="/suvery"
              />
              <DropDownMenu
                icon={<ImFilesEmpty />}
                text="Dimessions"
                href="/dimessions"
              />
              <DropDownMenu
                icon={<MdOutlineQuiz />}
                text="Questions"
                href="/questions"
              />
              <DropDownMenu
                icon={<FaUniversity />}
                text="Instutition"
                href="/institutions"
              />
              <DropDownMenu
                icon={<HiOutlineUsers />}
                text="Manage Users"
                href="/users"
              />
              <DropDownMenu
                icon={<CiSettings />}
                text="Settings"
                href="/settings"
              />
              <DropDownMenu
                icon={<CgComponents />}
                text="Analytics"
                href="/analytics"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
function DropDownItem(props) {
  return (
    <li className="dropdownitem">
      <Link to={props.href}>
        {props.icon}
        {props.text}
      </Link>
    </li>
  );
}
function DropDownMenu(props) {
  return (
    <li className="dropdownitemtwo">
      <Link to={props.href}>
        {props.icon}
        {props.text}
      </Link>
    </li>
  );
}

export default Topbar;
