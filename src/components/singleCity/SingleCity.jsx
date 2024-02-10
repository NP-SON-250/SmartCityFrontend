import React from "react";
import "../singleCity/singlecity.css";
import kicu from "../../assets/kicu.png";
import minibadge from "../../assets/mini-badge.svg";

function SingleCity({ Name, position }) {
  return (
    <div className="singlecity_container">
      <div className="singlecity_content">
        <div className="singlecity_image">
          <img src={kicu} alt="City Image" />
        </div>
        <div className="singlecity_details">
          <div className="singlecity_Name">
            <h4>{Name}</h4>
          </div>
          <div className="singlecity_overall">
            <div className="overall_icon">
              <img src={minibadge} alt="toggle" />
            </div>
            <div className="singlecity_position">
              <p>
                <span>#{position}</span> in Best Cities Overall
              </p>
            </div>
          </div>
          <div className="singlecity_desc">
            <p>
              Kicukiro is as well known for its potatoes trout and precious...
            </p>
          </div>
          <div className="singlecity_read-more">
            <p>Read More</p>
          </div>
        </div>
        <div className="singlecity_info"></div>
      </div>
      <div className="singlecity_rankings">
        <div>
          <p>
            <span>#1</span> Infrastructure
          </p>
          <p>
            <span>#5</span> Smart Economy
          </p>
          <p>
            <span>#13</span> Environment
          </p>
          <p>
            <span>#1</span> Mobility
          </p>
        </div>
        <div>
          <p>
            <span>#9</span> Techonology
          </p>
          <p>
            <span>#4</span> Quality Life
          </p>
          <p>
            <span>#1</span> Governance
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleCity;
