import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5001";

const YouTubeURL = () => {
  const [url, setUrl] = useState("");
  const [sessionName, setSessionName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, sessionName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();
      console.log("Session created:", data);

      navigate(`/session/${sessionName}`);
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to create session. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[320px] bg-white rounded-[40px] overflow-hidden shadow-xl">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <img
              className="mx-auto h-16 w-auto"
              src="/img/logo1.png"
              alt="LoudTogether Logo"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              LoudTogether
            </h2>
            <img
              src="/img/youtube.png"
              alt="YouTube"
              className="mx-auto h-10 w-auto mt-4"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  id="youtube-url"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter YouTube URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="session-name"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter Session Name"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Get Loud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YouTubeURL;
