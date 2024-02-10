import React from "react";
import "../header/header.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import city from "../../assets/city.svg";
import Kigali from "../../assets/kigali.jpg";
import center from "../../assets/city-center.jpg";
import convertion from "../../assets/convertion.jpeg";

function Header() {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
        },
      },
    ],
    appendDots: (dots) => (
      <div
        style={{
          bottom: "60px",
          position: "absolute",
        }}
      >
        <ul style={{ color: "0px" }}> {dots} </ul>
      </div>
    ),
  };
  return (
    <div className="header">
      <div className="header-container section__padding">
        <div className="header-content">
          <h1 className="scale-up-center">
            Revolutionize Decision-Making with SurveyMatrix :{" "}
          </h1>
          <h1 className="scale-up-center" style={{ fontSize: 25 }}>
            Your Comprehensive Assessment Solution
          </h1>
          <p className="bounce-in-top">
            "Unlock the potential of your city, business, and innovation with
            SurveyMatrix —an advanced assessment platform designed to deliver
            tailored surveys and provide actionable insights. Transform the way
            you gather data and make informed decisions for a brighter future."
            and ofcourse call to action
          </p>
          <div className="header-content__button">
            <p>and ofcourse call to action</p>
            <button className="shake-horizontal">Get Started</button>
          </div>
        </div>
        <div className="header-Image">
          <img src={city} alt="city" className="scale-up-center" />
        </div>
      </div>
      <div className="gradient_bg"></div>

      <Slider {...settings}>
        <div>
          <img src={Kigali} alt="Hero_image" className="hero_img" />
        </div>
        <div>
          <img src={center} alt="Hero_image" className="hero_img" />
        </div>
        <div>
          <img src={convertion} alt="Hero_image" className="hero_img" />
        </div>
      </Slider>
    </div>
  );
}
export default Header;
