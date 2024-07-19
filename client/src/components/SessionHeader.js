import React from "react";
import { FaThumbsUp } from "react-icons/fa";

const SessionHeader = ({ sessionName }) => {
  return (
    <div className="w-full flex flex-col items-center p-4 shadow-lg">
      <h2 className="text-2xl font-extrabold text-black text-center mb-4">
        {sessionName}
      </h2>
      <button className="flex items-center justify-center w-12 h-12 bg-[#17d9a3] rounded-full text-white">
        <FaThumbsUp size={24} />
      </button>
    </div>
  );
};

export default SessionHeader;
