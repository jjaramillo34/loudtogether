import React from "react";

const SessionForm = ({
  url,
  setUrl,
  sourceType,
  setSourceType,
  isRandomName,
  setIsRandomName,
  customSessionName,
  setCustomSessionName,
  userName,
  setUserName,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="url">
          URL
        </label>
        <input
          id="url"
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube or SoundCloud URL"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="sourceType">
          Source Type
        </label>
        <select
          id="sourceType"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
        >
          <option value="youtube">YouTube</option>
          <option value="soundcloud">SoundCloud</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2" htmlFor="userName">
          Your Name
        </label>
        <input
          id="userName"
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Session Name</label>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isRandomName}
            onChange={(e) => setIsRandomName(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-700">Generate random session name</span>
        </div>
        {!isRandomName && (
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={customSessionName}
            onChange={(e) => setCustomSessionName(e.target.value)}
            placeholder="Enter custom session name"
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Start Session
      </button>
    </form>
  );
};

export default SessionForm;
