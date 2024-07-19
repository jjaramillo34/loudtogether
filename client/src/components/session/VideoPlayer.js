import React, { useEffect } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId, sourceType, playerRef }) => {
  useEffect(() => {
    if (sourceType === "youtube" && playerRef.current) {
      const playerElement = playerRef.current.getIframe();
      if (playerElement) {
        playerElement.style.width = "0px";
        playerElement.style.height = "0px";
        playerElement.style.position = "absolute";
        playerElement.style.visibility = "hidden";
      }
    }
  }, [sourceType, videoId, playerRef]);

  if (sourceType === "youtube") {
    return (
      <YouTube
        videoId={videoId}
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={(event) => {
          playerRef.current = event.target;
          const playerElement = event.target.getIframe();
          if (playerElement) {
            playerElement.style.width = "0px";
            playerElement.style.height = "0px";
            playerElement.style.position = "absolute";
            playerElement.style.visibility = "hidden";
          }
        }}
      />
    );
  }

  // Add SoundCloud or other player integration if needed

  return null;
};

export default VideoPlayer;
