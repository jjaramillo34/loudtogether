import React, { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Music, Volume2 } from "lucide-react";
import { useSpring, animated, config } from "react-spring";

const CombinedMusicPlayer = ({
  sessionUrl,
  songTitle,
  onCopyUrl,
  src,
  isAdmin,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const truncateSongTitle = (title) => {
    return title.length > 50 ? title.substring(0, 47) + "..." : title;
  };

  const pulseAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (1) {
        await next({ transform: "scale(1.05)" });
        await next({ transform: "scale(1)" });
      }
    },
    config: { duration: 1000 },
  });

  const speakerAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (1) {
        await next({ transform: "scale(1.03)" });
        await next({ transform: "scale(0.97)" });
      }
    },
    config: { tension: 300, friction: 10 },
  });

  const equalizerBars = [
    useSpring({ height: "20%", loop: { reverse: true } }),
    useSpring({ height: "60%", loop: { reverse: true } }),
    useSpring({ height: "40%", loop: { reverse: true } }),
    useSpring({ height: "80%", loop: { reverse: true } }),
    useSpring({ height: "30%", loop: { reverse: true } }),
    useSpring({ height: "70%", loop: { reverse: true } }),
    useSpring({ height: "50%", loop: { reverse: true } }),
    useSpring({ height: "90%", loop: { reverse: true } }),
    useSpring({ height: "30%", loop: { reverse: true } }),
    useSpring({ height: "70%", loop: { reverse: true } }),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      equalizerBars.forEach((bar) => {
        bar.height.start(`${20 + Math.random() * 80}%`);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    audio.play().catch((error) => console.error("Playback failed", error));
  };

  const handlePause = () => {
    const audio = audioRef.current;
    audio.pause();
  };

  const handleSeek = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="bg-white p-8 pt-16 rounded-2xl shadow-xl max-w-md mx-auto relative overflow-hidden h-[900px]">
      <div className="relative z-10 text-gray-800 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <animated.h1
            style={pulseAnimation}
            className="text-3xl font-bold text-black"
          >
            LoudTogether
          </animated.h1>
          <MoreHorizontal className="text-[#17D9A3]" size={28} />
        </div>

        {/* Song Title Button */}
        <animated.button
          style={pulseAnimation}
          className="w-full bg-white text-[#17D9A3] py-5 px-6 rounded-xl mb-10 flex items-center justify-center transition-all hover:bg-opacity-90 shadow-md"
        >
          <Music size={28} className="mr-4 text-[#17D9A3]" />
          <span className="text-xl font-semibold">
            {truncateSongTitle(songTitle)}
          </span>
        </animated.button>

        {/* Boombox Play Area */}
        <div className="mb-10 flex-grow bg-[#17D9A3] rounded-3xl p-4 shadow-lg flex flex-col">
          {/* Top panel with equalizer */}
          <div className="bg-[#14c292] rounded-xl p-2 mb-4 flex justify-center items-end h-24">
            {equalizerBars.map((props, index) => (
              <animated.div
                key={index}
                className="bg-white w-6 mx-1 rounded-t-md"
                style={props}
              />
            ))}
          </div>

          {/* Speakers */}
          <div className="flex-grow flex justify-between items-center">
            <animated.div
              style={speakerAnimation}
              className="w-32 h-32 bg-[#14c292] rounded-full flex items-center justify-center"
            >
              <div className="w-24 h-24 bg-[#11a77c] rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-[#0e8c68] rounded-full"></div>
              </div>
            </animated.div>
            <animated.div style={pulseAnimation}>
              <Music size={64} className="text-white opacity-80" />
            </animated.div>
            <animated.div
              style={speakerAnimation}
              className="w-32 h-32 bg-[#14c292] rounded-full flex items-center justify-center"
            >
              <div className="w-24 h-24 bg-[#11a77c] rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-[#0e8c68] rounded-full"></div>
              </div>
            </animated.div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="mb-8">
          <audio ref={audioRef} src={src} />
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div
              className="h-2 bg-gray-200 rounded-full mb-2 cursor-pointer"
              onClick={(e) => {
                const seekTime =
                  (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
                handleSeek(seekTime);
              }}
            >
              <div
                className="h-full bg-[#17D9A3] rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {formatTime(currentTime)}
              </span>
              {isAdmin && (
                <button
                  onClick={isPlaying ? handlePause : handlePlay}
                  className="bg-[#17D9A3] text-white px-4 py-2 rounded-full"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              )}
              <span className="text-sm text-gray-600">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* Session URL */}
        <div className="mb-8">
          <p className="text-sm text-[#17D9A3] mb-2">copy your session url:</p>
          <div className="flex items-center bg-white rounded-xl p-4 shadow-md">
            <div className="bg-[#DCFDF4] p-2 rounded-lg mr-4">
              <Volume2 size={20} className="text-[#17D9A3]" />
            </div>
            <span className="text-base text-gray-800">{sessionUrl}</span>
          </div>
        </div>

        {/* Copy URL Button */}
        <animated.button
          style={pulseAnimation}
          className="w-full bg-[#17D9A3] text-white py-5 rounded-xl font-semibold text-lg transition-all hover:bg-opacity-90 shadow-lg"
          onClick={onCopyUrl}
        >
          Copy URL
        </animated.button>
      </div>
    </div>
  );
};

export default CombinedMusicPlayer;
