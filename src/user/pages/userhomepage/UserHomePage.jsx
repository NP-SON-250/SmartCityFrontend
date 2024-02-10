import { formatDistanceToNow } from 'date-fns';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userHomePage.css";

import { HiArrowLongRight } from "react-icons/hi2";
import Banner from "../../../components/banner/Banner";
import surveyImg from "../../../assets/surveyImg.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const success = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const name = localStorage.getItem("name");

function UserHomePage() {
  if (!localStorage.getItem("token")) {
    navigate("/signin");
  }
  const navigate = useNavigate();

  const [datas, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Avoid accessing the page without logged in

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const institutionId = localStorage.getItem("institutionId");
        const response = await axios.get(
          `https://smart-city-api-tpxn.onrender.com/SmartCity/API/Institutions/read/${institutionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = response.data.data.Surveys;
        setData(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log("MMM", datas);

  return (
    <>
      <Banner title="Welcome" />
      <div className="section__padding userHomePage_container">
        <div className="userHomePage_label">
          <div className="userHomePage_label-heading">
            <p>Avalailable Surveys</p>
          </div>
          <div className="userHomePage_label-end">
            <div>
              <p
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/signin');
                }}
              >
                Logout
              </p>
            </div>
            <div>
              <HiArrowLongRight size='24px' />
            </div>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : datas ? (
          Object.keys(datas || {}).map((key) => {
            const survey = datas[key];
            const formattedDate = formatDistanceToNow(
              new Date(survey.createdAt),
              {
                addSuffix: true
              }
            );
            return (
              <div className="userHomePage_survey" key={survey.id}>
                <div className="userHomePage_survey-Image">
                  <img src={surveyImg} alt="survey-feature-image" />
                </div>
                <div className="userHomePage_survey-content">
                  <div className="userHomePage_survey_content-heading">
                    <div>
                      <h4 className='font-medium'>
                        {survey.title || 'Untitled Survey'}
                      </h4>
                    </div>
                    <div className='node_container scale-75'>
                      <div className='node'></div>
                      <p>Published {formattedDate || 'N/A'}</p>
                    </div>
                  </div>
                  <div className='userHomePage_survey_content-desc mt-2 text-sm'>
                    {survey.description || 'No description available'}
                    </div>
                  <div className="userHomePage_survey_content-footer">
                    <div className="userHomePage_survey_content_footer-button">
                      {/* Assuming you have a link property in your survey data */}
                      <Link to={`/conduct/${survey.id}`} className="btn">
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : null}

        <div className="userHomePage_guidelines">
          <div className="userHomePage_guidelines-tutorial">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xopvkx6CpNs?si=HwarZ5HhL_UiJHgt"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="userHomePage_guidelines-instructions">
            <div className="userHomePage_guidelines_instructions-headings">
              <h4>Instructions</h4>
              <div className="line"></div>
            </div>
            <div className="userHomePage_guidelines_instructions-content">
              <p>
                Lorem ipsum dolor sit amet consectetur. Sed ut ornare est
                ultricies feugiat cras nibh egestas nec. Eu sit scelerisque
                ipsum condimentum sollicitudin habitant mattis gravida.
                Pellentesque varius convallis dui nibh tristique sit ultrices
                consequat molestie. Cras non eu quisque risus neque morbi at
                hac.
              </p>
              {/* <ul>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
              </ul> */}
              <p>
                Sed ut ornare est ultricies feugiat cras nibh egestas nec. Eu si
                scelerisque ipsum condimentum sollicitudin habitant
                <span style={{ color: "#1463f3" }}> Read more</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
