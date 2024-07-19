import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import SessionHeader from "../components/session/SessionHeader";
import SessionName from "../components/session/SessionName";
import AudioPlayer from "../components/session/AudioPlayer";
import UserListPopup from "../components/session/UserListPopup";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const [copied, setCopied] = useState(false);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const audioRef = useRef(null);
  const hasJoined = useRef(false);

  const handleShortenUrl = useCallback(async () => {
    const longUrl = `${window.location.origin}/${sessionName}`;
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

  const handlePlay = useCallback(() => {
    if (audioRef.current && isAdmin) {
      audioRef.current.play();
      setIsPlaying(true);
      socket.emit("play", { sessionName });
    }
  }, [isAdmin, sessionName]);

  const handlePause = useCallback(() => {
    if (audioRef.current && isAdmin) {
      audioRef.current.pause();
      setIsPlaying(false);
      socket.emit("pause", { sessionName });
    }
  }, [isAdmin, sessionName]);

  const handleSeek = useCallback(
    (time) => {
      if (audioRef.current && isAdmin) {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
        socket.emit("seek", { sessionName, time });
      }
    },
    [isAdmin, sessionName]
  );

  const handleSyncTime = useCallback((time) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
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

        // Initialize socket connection after joining
        socket = io(SERVER_URL);
        socket.emit("join", { sessionName, userName: data.userName });

        // Set up socket event listeners
        socket.on("play", () => setIsPlaying(true));
        socket.on("pause", () => setIsPlaying(false));
        socket.on("seek", handleSyncTime);
        socket.on("syncTime", handleSyncTime);
        socket.on("userJoined", handleUserJoined);
        socket.on("userLeft", handleUserLeft);
        socket.on("newAdmin", handleNewAdmin);
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
  }, [
    sessionName,
    handleShortenUrl,
    handleSyncTime,
    handleUserJoined,
    handleUserLeft,
    handleNewAdmin,
  ]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SessionHeader sessionName={sessionName} />
      <SessionName sessionName={sessionName} />
      <p>
        Welcome, {userName}
        {isAdmin ? " (Admin)" : ""}
      </p>
      <p>Now playing: {videoTitle}</p>
      <AudioPlayer
        ref={audioRef}
        src={audioUrl}
        isPlaying={isPlaying}
        currentTime={currentTime}
        onPlay={handlePlay}
        onPause={handlePause}
        onSeek={handleSeek}
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        showControls={isAdmin}
      />
      {isAdmin && (
        <div>
          <button onClick={handlePlay} disabled={isPlaying}>
            Play
          </button>
          <button onClick={handlePause} disabled={!isPlaying}>
            Pause
          </button>
        </div>
      )}
      <div>
        Current Time: {currentTime.toFixed(2)} / {duration.toFixed(2)}
      </div>
      <div>
        <p>Users in session:</p>
        {users && users.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        ) : (
          <p>No users in session</p>
        )}
      </div>
      <UserListPopup users={users} />
      <div>
        <p>Share this session:</p>
        <input type="text" value={shortUrl} readOnly />
        <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
          <button>Copy URL</button>
        </CopyToClipboard>
        {copied && <span>Copied!</span>}
      </div>
    </div>
  );
};

export default Session;
