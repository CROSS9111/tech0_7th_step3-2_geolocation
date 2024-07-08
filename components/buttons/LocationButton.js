import React from 'react';

const LocationButton = ({ onClick }) => {
  return (
    <div>
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg border-2 border-white hover:border-gray-300"
    >
      現在位置を取得する
    </button>
  </div>
  )
}

export default LocationButton;