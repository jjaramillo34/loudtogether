import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SessionForm from "../components/home/SessionForm";

const Home = () => {
  const [url, setUrl] = useState("");
  const [sourceType, setSourceType] = useState("youtube");
  const [isRandomName, setIsRandomName] = useState(true);
  const [customSessionName, setCustomSessionName] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "http://localhost:5001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          sourceType,
          sessionName: isRandomName ? "" : customSessionName,
          userName,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      navigate(`/${data.sessionName}`);
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-gray-700 relative">
      <Header />
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 text-indigo-600">
              LoudTogether
            </h1>
            <div className="flex justify-center items-center space-x-2">
              <img
                className="w-20 h-20"
                src="/img/youtube.png"
                alt="LoudTogether Logo"
              />
            </div>
          </div>

          <SessionForm
            url={url}
            setUrl={setUrl}
            sourceType={sourceType}
            setSourceType={setSourceType}
            isRandomName={isRandomName}
            setIsRandomName={setIsRandomName}
            customSessionName={customSessionName}
            setCustomSessionName={setCustomSessionName}
            userName={userName}
            setUserName={setUserName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
