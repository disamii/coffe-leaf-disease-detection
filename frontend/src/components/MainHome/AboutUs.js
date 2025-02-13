import React, { useState } from "react";
import "../../styling/AboutUs.css";

const AboutUs = () => {
  const [showMore, setShowMore] = useState({
    mission: false,
    howItWorks: false,
    targetAudience: false,
    team: false,
  });

  const toggleShowMore = (section) => {
    setShowMore((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="about-us">
      <div className="about-us_header">
        <h1>About Us</h1>
        <p>
          Welcome to the <strong>Coffee Disease Detection System</strong>! We
          are a team dedicated to revolutionizing the way coffee diseases are
          identified and managed. Through our advanced machine learning model,
          we aim to support coffee farmers and researchers in the fight against
          diseases that threaten the coffee industry.
        </p>
      </div>

      {/* Two Cards Per Row */}
      <div className="card-container">
        {/* Mission Statement */}
        <div className="card">
          <h2>Mission Statement</h2>
          <p>
            Our mission is to provide farmers and researchers with a reliable
            tool to quickly detect diseases in coffee plants, enabling early
            intervention and more efficient disease management.
          </p>
          {showMore.mission && (
            <p>
              By leveraging machine learning and computer vision, we aim to
              improve crop yields and sustainability in the coffee farming
              community.
            </p>
          )}
          <button onClick={() => toggleShowMore("mission")}>
            {showMore.mission ? "Show Less" : "Show More"}
          </button>
        </div>

        {/* How It Works */}
        <div className="card">
          <h2>How It Works</h2>
          <p>
            The <strong>Coffee Disease Detection System</strong> uses machine
            learning algorithms to analyze images of coffee plants.
          </p>
          {showMore.howItWorks && (
            <p>
              Researchers can train models using datasets to recognize various
              coffee diseases, while farmers can upload images of their plants
              for immediate disease detection. Our system also allows for model
              testing and predictions, giving farmers real-time insights into
              their crops' health.
            </p>
          )}
          <button onClick={() => toggleShowMore("howItWorks")}>
            {showMore.howItWorks ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>

      <div className="card-container">
        {/* Target Audience */}
        <div className="card">
          <h2>Our Target Audience</h2>
          <ul>
            <li>
              <strong>Farmers:</strong> Empowering coffee farmers to monitor
              their crops, detect diseases early, and make informed decisions
              about treatments.
            </li>
            {showMore.targetAudience && (
              <li>
                <strong>Researchers:</strong> Offering a platform for
                researchers to develop and test models, contributing to the
                ongoing improvement of disease detection technology.
              </li>
            )}
          </ul>
          <button onClick={() => toggleShowMore("targetAudience")}>
            {showMore.targetAudience ? "Show Less" : "Show More"}
          </button>
        </div>

        {/* The Team */}
        <div className="card">
          <h2>The Team</h2>
          <p>
            Our team is composed of researchers, developers, and coffee
            enthusiasts who are passionate about using technology to improve
            agriculture.
          </p>
          {showMore.team && (
            <p>
              With expertise in machine learning, agricultural science, and
              software development, we are committed to creating innovative
              solutions for the coffee industry.
            </p>
          )}
          <button onClick={() => toggleShowMore("team")}>
            {showMore.team ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
