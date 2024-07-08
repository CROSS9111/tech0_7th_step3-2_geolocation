import React from 'react';

const LocationButton = ({ label, onClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg border-2 border-white hover:border-gray-300" onClick={onClick}>
      {label}
    </button>
  );
}

export default LocationButton;