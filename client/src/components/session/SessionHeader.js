import React from "react";

const SessionHeader = ({ sessionName }) => (
  <div className="flex justify-between items-center mb-8 p-4 bg-[#f0f4f8] rounded-lg shadow-md">
    <h1 className="text-3xl font-bold font-montserrat text-[#1f2d3d]">
      LoudTogether
    </h1>
    <div className="w-20 h-12 shadow-inner rounded-md bg-[#fcfcfd] flex justify-center items-center">
      <div className="w-2 h-2 bg-[#17d9a3] rounded-full mx-1"></div>
      <div className="w-2 h-2 bg-[#17d9a3] rounded-full mx-1"></div>
      <div className="w-2 h-2 bg-[#17d9a3] rounded-full mx-1"></div>
    </div>
  </div>
);

export default SessionHeader;
