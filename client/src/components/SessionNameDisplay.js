import React from "react";

const SessionNameDisplay = ({ sessionName }) => {
  return (
    sessionName && (
      <div className="mt-4 text-lg">
        Session Name: <strong>{sessionName}</strong>
      </div>
    )
  );
};

export default SessionNameDisplay;
