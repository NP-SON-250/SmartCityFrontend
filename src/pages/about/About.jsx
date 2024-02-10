import './about.css';
import Aboutimage from './aboutimage.png';
import Banner from '../../components/banner/Banner';
import React, { useState } from 'react';
import Testimonial from '../../components/testimonial/Testimonial';
function About() {
  const [isMissionVisible, setMissionVisible] = useState(true);
  const [isVisionVisible, setVisionVisible] = useState(false);
  const [isValueVisible, setValueVisible] = useState(false);
  const [smartCityContent, setSmartCityContent] = useState(''); // State for Smart City content

  const toggleMission = () => {
    setMissionVisible(!isMissionVisible);
    setVisionVisible(false); // Hide vision when mission is toggled
    setValueVisible(false); // Hide value when mission is toggled
    setSmartCityContent('A Smart City Development Maturity is'); // Update content here
  };

  const toggleVision = () => {
    setVisionVisible(!isVisionVisible);
    setMissionVisible(false); // Hide mission when vision is toggled
    setValueVisible(false); // Hide value when vision is toggled
    setSmartCityContent('Our vision content...'); // Update content here
  };

  const toggleValue = () => {
    setValueVisible(!isValueVisible);
    setMissionVisible(false); // Hide mission when value is toggled
    setVisionVisible(false); // Hide vision when value is toggled
    setSmartCityContent('Our value content...'); // Update content here
  };

  return (
    <>
      <Banner title='About us' />
      <div className='section__padding about_container'>
        <div className='whole-page'>
          <div className='Aboutpage-main'>
            <div className='Aboutpage-stile'>
              <div className='Just-browse'>
                <h2>Just Browse away.I'ts all here</h2>
                <div className='line'></div>
              </div>
              <div className='Smartcity-p'>
                <p>
                  A Smart City Development Maturity Assessment Matrix is a tool
                  that can be used to assess the level of development and
                  readiness of a city in terms of implementing smart city
                  initiatives . It helps identify strengths, weaknesses, and
                  areas for improvement in various aspects of smart city
                  development.
                </p>
              </div>

              <div className='Project-mission'>
                <button onClick={toggleMission}>Our Mission</button>
                <button onClick={toggleVision}>Our Vision</button>
                <button onClick={toggleValue}>Our Value</button>
              </div>
              <div className='Smartcity-2p'>
                {isMissionVisible && (
                  <p>
                    A Smart City Development Maturity Assessment Matrix is a
                    tool that can be used to assess the level of development and
                    readiness of a city in terms of implementing smart city
                    initiatives. It helps identify strengths, weaknesses
                    development. It helps identify strengths, weaknesses, and
                    areas for improvement in various aspects areas for
                    improvement in various aspects of smart city development.
                  </p>
                )}

                {isVisionVisible && (
                  <p>
                    A improvement in various aspects of smart city development.
                    A Smart City Development Maturity Assessment Matrix is a
                    tool that can be used to assess the level of development and
                    readiness of a city in terms of implementing smart city
                    initiatives.and areas for improvement in various aspects of
                    smart city development.and areas for improvement in various
                    aspects of smart city development.areas for improvement in
                    various aspects of smart city development.
                  </p>
                )}

                {isValueVisible && (
                  <p>
                    the level of development and readiness of a city in terms of
                    implementing smart city initiatives. It helps identify
                    strengths, weaknesses, and areas for improvement in various
                    aspects of smart city development. A Smart City Development
                    Maturity Assessment Matrix is a tool that can be used to
                    assess the level of development and readiness of a city in
                    terms of implementing smart city initiatives.areas for
                    aspects of smart city development.aspects of smart city
                    development.
                  </p>
                )}
              </div>
            </div>

            <div className='about-image'>
              <img src={Aboutimage} alt='image' />
            </div>
          </div>
          
          
        </div>
      </div>
    </>
  );
}

export default About;
