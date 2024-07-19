import React from "react";

const CassetteTape = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-gray-800 w-48 h-96 rounded-lg shadow-2xl border-4 border-gray-700 transform rotate-90">
        <div className="absolute inset-1 bg-gray-900 rounded-lg border-4 border-gray-800">
          <div className="flex justify-between p-2">
            <div className="w-16 h-8 bg-gray-600 rounded shadow-inner"></div>
            <div className="w-16 h-8 bg-gray-600 rounded shadow-inner"></div>
          </div>
          <div className="flex justify-between items-center p-2 mt-12">
            <div className="relative w-24 h-24 bg-gray-700 rounded-full border-8 border-gray-600 flex justify-center items-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full animate-spin-slow"></div>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
              </div>
            </div>
            <div className="relative w-24 h-24 bg-gray-700 rounded-full border-8 border-gray-600 flex justify-center items-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full animate-spin-slow"></div>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-12 px-4">
            <div className="w-full h-8 bg-gray-700 rounded shadow-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CassetteTape;
