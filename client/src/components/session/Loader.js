import React, { useEffect, useState } from "react";

const Loader = ({ currentTime, duration }) => {
  const [progress, setProgress] = useState((currentTime / duration) * 100);

  useEffect(() => {
    if (duration > 0) {
      const newProgress = (currentTime / duration) * 100;
      setProgress(newProgress > 100 ? 100 : newProgress);
    }
  }, [currentTime, duration]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="loader">
      <p>Current Time Elapsed: {formatTime(currentTime)}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-[#17d9a3] h-2.5 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
