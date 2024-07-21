import React from "react";
import "../../styles/sessionheader.css";

const SessionHeader = ({ sessionName }) => (
  <div className="session-header">
    <div className="left-section">
      <h2 className="title">LoudTogether</h2>
    </div>
    <div className="right-section">
      <div className="rectangle"></div>
      <div className="ellipse"></div>
      <div className="ellipse"></div>
      <div className="ellipse"></div>
    </div>
  </div>
);

export default SessionHeader;
