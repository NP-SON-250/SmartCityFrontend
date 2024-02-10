import React from "react";
import "../how-it-works/works.css";
import first1 from "./how it works svgs and image/first1.jpg";
import second2 from "./how it works svgs and image/second2.jpg";
import Third34 from "./how it works svgs and image/Third34.jpg";
function Works() {
  return (
    <div className="how__it_works section__padding">
      <div className="how__header">
        <h1>How it works</h1>
        <div className="underscore"></div>
      </div>
      <div className="how__content">
        <div className="how__signup">
          <div className="photowork">
            <img src={first1} alt="signup" />
          </div>
          <div style={{ width: "95%", margin: "0 auto", textAlign: "center" }}>
            <h1
              className="HowItWorksTitle"
              style={{ fontSize: 20, padding: "8px",  }}
            >
              {" "}
              Select Assessment Type
            </h1>
          </div>
          <div
            style={{
              width: "95%",
              margin: "0 auto",
              textAlign: "center",
              fontSize: "10px",
              padding: "4px",
            }}
          >
            <p>
              refers to choosing the method of assessment for a
              survey. This could include options like multiple-choice questions,
              open-ended responses, rating scales, or a combination of these.
              The choice of assessment type depends on the survey's objectives,
              the information you want to gather, and the preferences of the
              respondents.
            </p>
          </div>
        </div>
        <div className="how__signup">
          <div className="photowork">
            <img src={second2} alt="signup" />
          </div>
          <div style={{ width: "95%", margin: "0 auto", textAlign: "center" }}>
            <h1
              className="HowItWorksTitle"
              style={{ fontSize: 20, padding: "8px" }}
            >
              {" "}
              Customize Survey
            </h1>
          </div>
          <div
            style={{
              width: "95%",
              margin: "0 auto",
              textAlign: "center",
              fontSize: "10px",
              padding: "4px",
            }}
          >
            <p>
            Customizing a survey entails tailoring its design, structure, and features to specific needs . 
            This involves incorporating branding, using diverse question formats, ensuring accessibility,
             and conducting thorough testing for an engaging and effective survey experience, enhancing data quality.
            </p>
          </div>
        </div>

        <div className="how__signup">
          <div className="photowork">
            <img src={Third34} alt="signup" />
          </div>
          <div style={{ width: "95%", margin: "0 auto", textAlign: "center" }}>
            <h1
              className="HowItWorksTitle"
              style={{ fontSize: 20, padding: "8px" }}
            >
              {" "}
              Analyze Insights
            </h1>
          </div>
          <div
            style={{
              width: "95%",
              margin: "0 auto",
              textAlign: "center",
              fontSize: "10px",
              padding: "4px",
            }}
          >
            <p> 
Analyzing insights entails utilizing statistical
 methods and data interpretation to extract valuable conclusions
  and patterns from collected data. This process facilitates informed decision-making 
  and a comprehensive understanding of the subject being studied.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
