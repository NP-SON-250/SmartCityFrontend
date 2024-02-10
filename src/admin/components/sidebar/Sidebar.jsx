import React, { useState } from "react";
import "../sidebar/sidebar.css";
import { FaUniversity } from "react-icons/fa";
import { IoLogoSkype } from "react-icons/io";
import { FaUsersCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { ImFilesEmpty } from "react-icons/im";
import { AiOutlineDashboard } from "react-icons/ai";
import "animate.css";

function Sidebar({ isClicked, setIsClicked }) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const toggleHiddenState = () => {
    setHeaderHidden(!headerHidden);
    console.log(headerHidden);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="logos">
          <IoLogoSkype
            className={`sidebar__menu${isClicked ? " clicked" : ""}`}
            
            onClick={() => {
              setIsClicked(!isClicked);
              toggleHiddenState(); 
            }}
          />
          <h2
            className={`animate__animated animate__flipInY hidden__onclick${
              headerHidden ? " hidden" : ""
            }`}
          >
            URVEY <span>MATRIX</span>
          </h2>
        </div>

        <div className="menu__links">
          <div className="sidebar__home">
            <Link to="/dashboard">
              <AiOutlineDashboard className="sidebar__icon" />
              <h2 className={`hidden__onclick${headerHidden ? " hidden" : ""}`}>
                Dashboard
              </h2>
            </Link>
          </div>
          <div className="sidebar__home">
            <Link to="/survey">
              <MdOutlineCreateNewFolder className="sidebar__icon" />
              <h2 className={`hidden__onclick${headerHidden ? " hidden" : ""}`}>
                Suvery
              </h2>
            </Link>
          </div>
          <div className="sidebar__home">
            <Link to="/dimessions">
              <ImFilesEmpty className="sidebar__icon" />
              <h2 className={`hidden__onclick${headerHidden ? " hidden" : ""}`}>
                Dimessions
              </h2>
            </Link>
          </div>
          <div className="sidebar__home">
            <Link to="/institutions">
              <FaUniversity className="sidebar__icon" />
              <h2 className={`hidden__onclick${headerHidden ? " hidden" : ""}`}>
                Instutition
              </h2>
            </Link>
          </div>
          <div className="sidebar__home">
            <Link to="/users">
              <FaUsersCog className="sidebar__icon" />
              <h2 className={`hidden__onclick${headerHidden ? " hidden" : ""}`}>
                users
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
