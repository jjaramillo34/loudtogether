import React from "react";

const CurrentSong = ({ videoTitle }) => (
  <div className="w-full bg-[#17d9a3] rounded-2xl p-4 mb-8 flex items-center">
    <img
      className="w-6 h-6 mr-2"
      src="/img/loudtogether-on-note-46034668-D141-4F8B-8BF6-01E543036EE9@2x.png"
      alt="Note"
    />
    <span className="text-[#1f2d3d] font-montserrat text-sm truncate">
      {videoTitle.length > 50
        ? `${videoTitle.substring(0, 50)}...`
        : videoTitle}
    </span>
  </div>
);

export default CurrentSong;
