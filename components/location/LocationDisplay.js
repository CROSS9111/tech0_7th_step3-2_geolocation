import React from 'react';

const LocationDisplay = ({ latitude, longitude }) => {
  return (
    <div className="text-center mt-3">
      <p className="text-lg text-gray-700">緯度: {latitude !== null ? `${latitude}度` : '???度'}</p>
      <p className="text-lg text-gray-700">経度: {longitude !== null ? `${longitude}度` : '???度'}</p>
    </div>
  )
}

export default LocationDisplay;