import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          🤖 AI is Finding Your Perfect Matches
        </h3>
        <p className="text-sm text-gray-600 text-center">
          Analyzing your profile and matching with 200+ internships...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;