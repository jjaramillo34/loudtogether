import React from "react";

const SessionName = ({ sessionName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg">
      <h1 className="text-3xl text-white italic">{sessionName}</h1>
    </div>
  );
};

export default SessionName;
