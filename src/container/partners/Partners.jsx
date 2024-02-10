import React from "react";
import "../partners/partners.css";
import LogoImage from "../../assets/LogoImage.png";
import irembo from "../../assets/irembo.png";
import klab from "../../assets/klab.png";
import risa from "../../assets/risa.png";
import ur from "../../assets/ur.png";
import mastercard from "../../assets/mastercard.png";
import melon from "../../assets/melon.png";


function Partners() {
  return <div className="section__padding">
  <div className="partners-and-description">
    <div className="partners-one">
      <h2>Partners</h2>
      <button className="sponsor-button">BECOME A SPONSOR</button>
      
    </div>
    <div className="partners-two">
      <p className="partners-description">We wouldn’t be able to host our summit without help from these amazing organization .A huge  thank you to all our sponsors and partners!! </p>
    </div>
    </div>

    <div className="sponsors">

      <div className="sponsors-name">
        
        <img src={LogoImage} alt="image"  className="sponsors-logo"/>
      </div>
      <div className="sponsors-name">

        <img src={irembo} alt="image"  className="sponsors-logo"/>
      </div>
      <div className="sponsors-name">

        <img src={klab} alt="image"  className="sponsors-logo"/>
      </div>
      <div className="sponsors-name">

        <img src={risa} alt="image"  className="sponsors-logo"/>
      </div>
      <div className="sponsors-name">

        <img src={ur} alt="image"  className="sponsors-logo"/>
      </div>
      <div className="sponsors-name">

        <img src={mastercard} alt="image"  className="sponsors-logo"/>
      </div>
      <div className="sponsors-name">

        <img src={melon} alt="image"  className="sponsors-logo"/>
      </div>

    </div>
  
  
  </div>;
}

export default Partners;
