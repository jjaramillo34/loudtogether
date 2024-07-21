import React, { useState } from "react";
import "../../styles/presession.css";

const PreSession = () => {
  const [sessionCode, setSessionCode] = useState("");

  const handleJoin = () => {
    console.log("Joining session with code:", sessionCode);
    // Add your join session logic here
  };

  return (
    <div className="pre-session screen">
      <div className="bg-wrapper">
        <div className="bg-circle"></div>
        <div className="logo-wrapper">
          <div className="logo-circle"></div>
          <img
            src="/img/logo-placeholder.png"
            alt="LoudTogether Logo"
            className="logo-image"
          />
        </div>
      </div>

      <div className="content-wrapper">
        <div className="home-title">
          <h1 className="title">LoudTogether</h1>
        </div>

        <div className="session-input-wrapper">
          <label htmlFor="session-code" className="input-label">
            Enter Session Code:
          </label>
          <div className="input-container">
            <input
              id="session-code"
              type="text"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value)}
              placeholder="Enter code here..."
              className="session-input"
            />
          </div>
        </div>

        <button onClick={handleJoin} className="join-button">
          <span className="join-text">Join Session</span>
        </button>
      </div>

      <div className="menu-icon">
        <div className="menu-dot"></div>
        <div className="menu-dot"></div>
        <div className="menu-dot"></div>
      </div>
    </div>
  );
};

export default PreSession;
