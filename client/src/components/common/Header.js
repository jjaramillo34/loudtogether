import React from "react";
import AnimatedHeaderBackground from "./AnimatedHeaderBackground";
import { FaBars } from "react-icons/fa";

const Header = () => {
  return (
    <header className="relative bg-gray-100 p-4 overflow-hidden">
      <AnimatedHeaderBackground />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <img
            src="img/logo1.png"
            alt="Logo"
            className="h-10 sm:h-10 hidden sm:block"
            style={{ minHeight: "50px" }}
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900 text-center">
            LoudTogether
          </h1>
        </div>
        <div className="flex-1 flex justify-end sm:hidden">
          <FaBars size={35} />
        </div>
      </div>
    </header>
  );
};

export default Header;
