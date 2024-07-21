import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import LoudTogetherOn from "../components/session/LoudTogetherOn";
import UserListPopup from "../components/session/UserListPopup";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5001";
let socket;

const Session = () => {
  const { id: sessionName } = useParams();
  const [userName, setUserName] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shortUrl, setShortUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const hasJoined = useRef(false);

  const handleShortenUrl = useCallback(async () => {
    const longUrl = `${window.location.origin}/session/${sessionName}`;
    try {
      const response = await fetch(`${SERVER_URL}/shorten-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error("Failed to shorten URL", error);
    }
  }, [sessionName]);

  useEffect(() => {
    if (hasJoined.current) return;

    const joinSession = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/join-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionName }),
        });
        if (!response.ok) {
          throw new Error("Failed to join session");
        }
        const data = await response.json();
        setUserName(data.userName);
        setVideoId(data.videoId);
        setVideoTitle(data.videoTitle);
        setAudioUrl(`${SERVER_URL}${data.audioUrl}`);
        setCurrentTime(data.currentTime);
        setIsPlaying(data.isPlaying);
        setUsers(data.users);
        setIsAdmin(data.isAdmin);

        socket = io(SERVER_URL);
        socket.emit("join", { sessionName, userName: data.userName });

        socket.on("play", () => setIsPlaying(true));
        socket.on("pause", () => setIsPlaying(false));
        socket.on("seek", handleSyncTime);
        socket.on("syncTime", handleSyncTime);
        socket.on("userJoined", handleUserJoined);
        socket.on("userLeft", handleUserLeft);
        socket.on("newAdmin", handleNewAdmin);

        // Request initial time sync
        socket.emit("requestTimeSync", { sessionName });
      } catch (error) {
        console.error("Error joining session:", error);
        alert("Failed to join session. Please try again later.");
      }
    };

    joinSession();
    handleShortenUrl();
    hasJoined.current = true;

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [sessionName, handleShortenUrl]);

  const handlePlay = useCallback(() => {
    if (isAdmin) {
      setIsPlaying(true);
      socket.emit("play", { sessionName });
    }
  }, [isAdmin, sessionName]);

  const handlePause = useCallback(() => {
    if (isAdmin) {
      setIsPlaying(false);
      socket.emit("pause", { sessionName });
    }
  }, [isAdmin, sessionName]);

  const handleSeek = useCallback(
    (time) => {
      if (isAdmin) {
        setCurrentTime(time);
        socket.emit("seek", { sessionName, time });
      }
    },
    [isAdmin, sessionName]
  );

  const handleSyncTime = useCallback((time) => {
    setCurrentTime(time);
  }, []);

  const handleTimeUpdate = useCallback(
    (time) => {
      setCurrentTime(time);
      if (isAdmin) {
        socket.emit("timeUpdate", { sessionName, currentTime: time });
      }
    },
    [isAdmin, sessionName]
  );

  const handleDurationChange = useCallback((newDuration) => {
    setDuration(newDuration);
  }, []);

  const handleUserJoined = useCallback((data) => {
    setUsers(data.users);
  }, []);

  const handleUserLeft = useCallback((data) => {
    setUsers(data.users);
  }, []);

  const handleNewAdmin = useCallback(
    (data) => {
      setIsAdmin(data.admin === userName);
    },
    [userName]
  );

  const handleCopyUrl = useCallback(() => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, [shortUrl]);

  return (
    <div className="session-container">
      <LoudTogetherOn
        sessionUrl={shortUrl}
        songTitle={videoTitle}
        onCopyUrl={handleCopyUrl}
        src={audioUrl}
        isAdmin={isAdmin}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        users={users}
        userName={userName}
      />
      <UserListPopup
        users={users}
        userName={userName}
        showUserList={showUserList}
        setShowUserList={setShowUserList}
      />
    </div>
  );
};

export default Session;
