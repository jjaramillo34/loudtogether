import React from "react";

const ControlButtons = ({
  isAdmin,
  handlePlay,
  handlePause,
  handleNext,
  handleReset,
}) => (
  <div className="flex justify-around w-full mt-4">
    {isAdmin && (
      <>
        <button
          className="bg-[#17d9a3] text-white p-2 rounded"
          onClick={handlePlay}
        >
          Play
        </button>
        <button
          className="bg-[#17d9a3] text-white p-2 rounded"
          onClick={handlePause}
        >
          Pause
        </button>
        <button
          className="bg-[#17d9a3] text-white p-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
        <button
          className="bg-[#17d9a3] text-white p-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </>
    )}
  </div>
);

export default ControlButtons;
