import React from "react";

const SourceSelection = ({ sourceType, setSourceType }) => {
  return (
    <div>
      <label className="flex items-center mb-4">
        <input
          type="radio"
          value="youtube"
          checked={sourceType === "youtube"}
          onChange={(e) => setSourceType(e.target.value)}
          className="mr-2"
        />
        YouTube
      </label>
      <label className="flex items-center mb-4">
        <input
          type="radio"
          value="soundcloud"
          checked={sourceType === "soundcloud"}
          onChange={(e) => setSourceType(e.target.value)}
          className="mr-2"
        />
        SoundCloud
      </label>
    </div>
  );
};

export default SourceSelection;
