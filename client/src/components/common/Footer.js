import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <p className="text-lg font-semibold">
        &copy; {new Date().getFullYear()} Loud Together
      </p>
      <div className="mt-2">
        <Link to="/disclaimer" className="text-blue-400 hover:underline mx-2">
          Disclaimer
        </Link>
        <Link to="/appuse" className="text-blue-400 hover:underline mx-2">
          App Use
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
