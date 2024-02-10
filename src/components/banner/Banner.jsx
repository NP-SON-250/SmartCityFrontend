import React from "react";
import "../banner/banner.css";
import convertion from "../../assets/convertion.jpeg";

function Banner({ title }) {
  return (
    <>
      <div className="banner__container">
        <div className="page_title">
          <h1>{title}</h1>
        </div>
        <div className="gradient_bg"></div>
        <img src={convertion} alt="banner" />
      </div>
    </>
  );
}

export default Banner;
