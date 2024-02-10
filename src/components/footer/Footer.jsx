import React from "react";
import "../footer/footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-component">
      <div className="footer-upperbody"></div>
      <div className="section__padding">
        <div className="footer__container">
          <div className="footer-navigation footer-header">
            <div className="left-side">
              <h1>Navigation</h1>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Survey and ranking</a>
                </li>
                <li>
                  <a href="#">city profiles</a>
                </li>
              </ul>
            </div>
            {/* <div className="right-side">
              <h1></h1>
              <ul>
                <li>
                  <a href="#">Foods</a>
                </li>
                <li>
                  <a href="#">Schools</a>
                </li>
                <li>
                  <a href="#">Education</a>
                </li>
                <li>
                  <a href="#">Technologies</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="footer-top-smart-cities footer-header">
            <div className="inner-side">
              <h1>TOP smart Cities</h1>
              <ul>
                <li>
                  <a href="#">Nyarugenge is ...</a>
                </li>
                <li>
                  <a href="#">Muhanga is...</a>
                </li>
                <li>
                  <a href="#">Karongi is...</a>
                </li>
                <li>
                  <a href="#">Bugesera...</a>
                </li>
                <li>
                  <a href="#">Huye is one the ...</a>
                </li>
                <li>
                  <a href="#">Nyamagabe is...</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-contactus footer-header">
            <div className="inner-side">
              <h1>CONTACT US</h1>
              <p>
                For all inquiries use{" "}
                <span>
                  <a href="mailto:smartcity@cities.net">smartcity@cities.net</a>
                </span>{" "}
                or head over to our
                <span>
                  <a href="#">Contact</a>
                </span>{" "}
                page and send us a message.
              </p>
              <div className="logo-icons">
                <a href="#">
                  <div>
                    <FaFacebookF className="icons facebook" />
                  </div>
                </a>
                <a href="#">
                  <div>
                    <FaInstagram className="icons instagram" />
                  </div>
                </a>
                <a href="#">
                  <div>
                    <FaWhatsapp className="icons whatsapp" />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-subscribe footer-header">
            <div className="inner-side">
              <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
              <form action="">
                <div className="subscribe-content">
                  <p>
                    Subscribe to our newsletter to stay up to date with the
                    latest news and offers
                  </p>
                  <div className="subscribe-email-input">
                    <input
                      type="text"
                      className="subscribe-input"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <button className="subscribe-email">Submit</button>
              </form>
            </div>
          </div>
          <div className="footer-down">
            <p>Copyright © 2023. All rights reserved</p>
            <p>Terms Of Use | Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
