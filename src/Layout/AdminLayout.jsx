import React, { useState, useEffect } from "react";
import { Sidebar, Topbar, Dash_footer } from "../admin/components";
import { Outlet, useNavigate } from "react-router-dom";
import AppProvider from "../context/AppProvider";
import "../Layout/adminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  // Avoid accessing the page without logged in
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const toggleClickedState = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={`adminLayout${isClicked ? " hidden__sidebar" : ""}`}>
      {/* <div className="toolbar-layout"> */}
      <div className="toolbar-layout">
        <Topbar />
      </div>
      <div className="sidebar-layout">
        <Sidebar isCicked={isClicked} setIsClicked={toggleClickedState} />
      </div>
      <div className="outlets-layout">
        <Outlet />
      </div>
      <div className="footer-layout">
        <Dash_footer />
      </div>
    </div>
  );
}

export default AdminLayout;
