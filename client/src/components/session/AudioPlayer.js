import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "../../styles/audioplayer.css";

const AudioPlayer = forwardRef(
  (
    {
      src,
      isPlaying,
      currentTime,
      onPlay,
      onPause,
      onSeek,
      onTimeUpdate,
      onDurationChange,
      showControls,
    },
    ref
  ) => {
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);

    useImperativeHandle(ref, () => ({
      play: () => audioRef.current.play(),
      pause: () => audioRef.current.pause(),
      seek: (time) => {
        audioRef.current.currentTime = time;
      },
      get currentTime() {
        return audioRef.current.currentTime;
      },
      set currentTime(time) {
        audioRef.current.currentTime = time;
      },
    }));

    useEffect(() => {
      const audio = audioRef.current;
      if (isPlaying) {
        audio.play().catch((error) => console.error("Playback failed", error));
      } else {
        audio.pause();
      }
    }, [isPlaying]);

    useEffect(() => {
      const audio = audioRef.current;
      if (Math.abs(audio.currentTime - currentTime) > 1) {
        audio.currentTime = currentTime;
      }
    }, [currentTime]);

    const handleTimeUpdate = () => {
      onTimeUpdate(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioRef.current.duration);
      onDurationChange(audioRef.current.duration);
    };

    const handleSeek = (e) => {
      const seekTime =
        (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
      onSeek(seekTime);
    };

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
      <div className="audio-player">
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationChange}
          onEnded={onPause}
        />
        <div className="progress-bar" onClick={handleSeek}>
          <div
            className="progress"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span> /{" "}
          <span>{formatTime(duration)}</span>
        </div>
        {showControls && (
          <div className="controls">
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="play-pause-btn"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default AudioPlayer;
