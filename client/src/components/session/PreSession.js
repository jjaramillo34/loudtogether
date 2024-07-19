import React, { useState, useEffect } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

const PreSession = ({ startSession, currentTime }) => {
  const [userName, setUserName] = useState("");

  const handleStartSession = () => {
    let finalUserName = userName;
    if (!finalUserName) {
      finalUserName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: "-",
        length: 3,
      });
      setUserName(finalUserName); // This ensures the generated name is set in the state
    }
    startSession(finalUserName);
  };

  useEffect(() => {
    // Perform any necessary operations with currentTime here
    console.log("Current time:", currentTime);
  }, [currentTime]);

  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="relative w-[375px] h-[667px] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div className="absolute top-8 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-[#1f2d3d]">LoudTogether</h1>
        </div>
        <div className="absolute bottom-40 flex items-center justify-center w-3/4 max-w-md">
          <div
            className="bg-[#17d9a3] text-white text-center py-3 rounded-lg cursor-pointer flex items-center justify-center"
            onClick={handleStartSession}
          >
            <span className="mr-2">Start Playing</span>
            <img
              className="w-4 h-4"
              src="img/loudtogether-off-vector-AA079CA9-1A5D-44D4-AC1F-D4D0354F611C@2x.png"
              alt="Vector"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSession;
