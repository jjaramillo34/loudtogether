import React from "react";
import { FaUsers } from "react-icons/fa";
const userLimit = 10; // Limit the number of users displayed in the list
const UserListPopup = ({ users, showUserList, setShowUserList }) => (
  <>
    <button
      className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-[#17d9a3] text-white p-4 rounded-full shadow-lg z-50"
      onClick={() => setShowUserList(!showUserList)}
    >
      <FaUsers size={24} />
    </button>
    {showUserList && (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-72">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button
            className="absolute top-2 right-2 text-black text-2xl"
            onClick={() => setShowUserList(false)}
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          {users.length > userLimit ? (
            <p className="text-lg">
              There are {users.length} users in the session.
            </p>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {users.map((user, index) => (
                <li key={index} className="mb-2 text-lg">
                  {user}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )}
  </>
);

export default UserListPopup;
