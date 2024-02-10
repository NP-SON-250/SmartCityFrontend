import React from "react";
import "../whySmartCities/wsc.css";
import Convertion from "../whySmartCities/Convertion.jpg";
import { FaExternalLinkAlt } from "react-icons/fa";
function WSC() {
  return (
    <div className="wsc-container section__padding">
      <div className="wcs-image bounce-in-top ">
        <img src={Convertion} alt="image" />
      </div>
      <div className="wsc-main scale-up-center">
        <div className="wcs-title">
          <h1>Why Choose SurveyMatrix?</h1>
        </div>
        <div className="line"></div>
        <div className="wcs-paragraph">
          <p>
          SurveyMatrix stands out as a dynamic solution, offering versatility that transcends industry boundaries.
         Our platform excels in tailoring surveys to precisely match the unique needs of your audience, whether you're delving 
         into smart city initiatives, refining data management strategies for companies, or navigating the complex world of innovation
          ecosystems.<br/>
         What makes SurveyMatrix truly innovative is its commitment to providing more than just data.
         We deliver intuitive analytics that transform raw information into actionable insights. 
         This means you not only gather comprehensive data but also gain a clear understanding 
         of the steps needed to drive positive change in your sector.<br/>
With the ICT Chamber as the exclusive provider, SurveyMatrix ensures
 that your assessments not only meet but exceed industry standards.
  Join us on this innovative journey, where adaptability, precision, and actionable insights converge to 
  revolutionize the way you approach assessments. SurveyMatrix: Your pathway to impactful decision-making and transformative growth.
          </p>
        </div>
        <div className="wcs-explore">
          Explore more
          <FaExternalLinkAlt className="wcs-icon" />
        </div>
      </div>
    </div>
  );
}

export default WSC;