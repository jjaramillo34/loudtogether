import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatedImage = ({ src, alt, className }) => {
  const props = useSpring({
    from: { opacity: 0.7, transform: "scale(0.95)" },
    to: async (next) => {
      while (1) {
        await next({ opacity: 1, transform: "scale(1.05)" });
        await next({ opacity: 0.7, transform: "scale(0.95)" });
      }
    },
    config: { duration: 1000 },
  });

  return (
    <animated.img
      style={props}
      className={`w-full h-full object-contain ${className}`}
      src={src}
      alt={alt}
    />
  );
};

const CombinedMusicComponent = ({ onPlay, onPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      onPause && onPause();
    } else {
      onPlay && onPlay();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full">
      <div className="bg-2-69RH8s absolute inset-0 bg-[#dcfdf4] rounded-full"></div>
      <div className="group-5541-69RH8s absolute inset-0">
        <div className="vector-xGozxq vector relative w-full h-full">
          <AnimatedImage
            className="vector-Vs1RnK vector absolute inset-0"
            src="/img/loudtogether-on-vector-498E4C66-52C4-4987-B6DB-354057AD0C69@2x.png"
            alt="Vector"
          />
          <AnimatedImage
            className="vector-flAoIZ vector absolute inset-0"
            src="/img/loudtogether-on-vector-337F2C1C-366D-45EB-940A-9905A088EDB2@2x.png"
            alt="Vector"
          />
          <AnimatedImage
            className="vector-RxwuX7 vector absolute inset-0"
            src="/img/loudtogether-on-vector-FF45206B-18C6-492B-8DA6-BEFA77012486@2x.png"
            alt="Vector"
          />
        </div>
        <div className="group-5540-xGozxq absolute inset-0">
          <div className="ellipse-5-6nCCms ellipse-5 absolute inset-0 border border-[#17d9a3] opacity-25 rounded-full"></div>
          <div className="ellipse-5-2TCkme ellipse-5 absolute inset-[40px] bg-[#17d9a3] opacity-[0.04] rounded-full"></div>
          <div className="ellipse-3-6nCCms absolute inset-[71px] bg-[#17d9a3] opacity-[0.04] rounded-full"></div>
        </div>
      </div>

      {/* Music Note Icon */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[136px] h-[136px] rounded-full bg-[#17d9a3] flex items-center justify-center">
        <img
          className="w-10 h-10 cursor-pointer"
          src={isPlaying ? "/img/pause.png" : "/img/play.png"}
          alt={isPlaying ? "Pause" : "Play"}
          onClick={togglePlayPause}
        />
      </div>
    </div>
  );
};

export default CombinedMusicComponent;
