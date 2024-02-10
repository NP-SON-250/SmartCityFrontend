import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

function UserLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default UserLayout;
