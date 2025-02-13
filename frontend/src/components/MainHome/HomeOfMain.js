import React, { useState } from "react";
import CoffeeAI from "../../images/CoffeeAI.png";
import farmer from "../../images/farmer.png";
import researcher from "../../images/researcher.png";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import "../../styling/Home.css";

function HomeOfMain() {
  return (
    <>
      <Header />
      <div className="main-homepage">
        <div className="mainpage-sub">
          <h1>Coffee Disease Detection System</h1>
          <p>
            Coffee Disease Detection System is an AI-powered platform designed
            to assist coffee farmers, researchers, and agricultural experts in
            identifying and managing coffee plant diseases. By providing
            real-time diagnosis and actionable treatment recommendations, the
            system helps farmers reduce crop losses, optimize productivity, and
            ensure the health of coffee plantations.
          </p>
        </div>
        <div>
          <img src={CoffeeAI} alt="Coffee AI Logo" />
        </div>
      </div>
      <div className="maininfo-container">
        <div className="maininfo-item">
          <img src={farmer} alt="Farmer" />
          <h3>For Farmers</h3>
          <TextExpander
            expanded={false}
            collapsedNum={15}
            collapsedButtonText="Show Less"
            expandedButtonText="Show More"
          >
            The Coffee Disease Detection System provides farmers with powerful
            tools to identify diseases early, saving crops and increasing
            yields. Get insights and recommendations tailored to your plantation
            needs. For more detail click the link Farmer in the top header.
          </TextExpander>
        </div>

        <div className="maininfo-item">
          <img src={researcher} alt="Researcher" />
          <h3>For Researchers</h3>
          <TextExpander
            expanded={false}
            collapsedNum={15}
            collapsedButtonText="Show Less"
            expandedButtonText="Show More"
          >
            Researchers can leverage cutting-edge AI models to analyze data and
            explore innovative approaches to managing coffee plant diseases,
            ensuring sustainable farming practices.
          </TextExpander>
        </div>
      </div>

      <Footer />
    </>
  );
}

// TextExpander component to handle dynamic text expansion
const TextExpander = ({
  expanded,
  children,
  collapsedNum = 5,
  collapsedButtonText,
  expandedButtonText,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const display = isExpanded
    ? children
    : `${children.split(" ").slice(0, collapsedNum).join(" ")}...`;

  return (
    <div>
      <span>{display}</span>
      <button onClick={() => setIsExpanded((exp) => !exp)}>
        {isExpanded ? collapsedButtonText : expandedButtonText}
      </button>
    </div>
  );
};

export default HomeOfMain;
