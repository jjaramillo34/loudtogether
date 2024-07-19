import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

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
    },
    ref
  ) => {
    const audioRef = useRef(null);

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

    useEffect(() => {
      const audio = audioRef.current;
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("durationchange", handleDurationChange);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("durationchange", handleDurationChange);
        audio.removeEventListener("play", onPlay);
        audio.removeEventListener("pause", onPause);
      };
    }, [onPlay, onPause, onTimeUpdate, onDurationChange]);

    const handleTimeUpdate = () => {
      onTimeUpdate(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
      onDurationChange(audioRef.current.duration);
    };

    return <audio ref={audioRef} src={src} />;
  }
);

export default AudioPlayer;
