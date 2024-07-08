"use client"

import Image from "next/image";
import { useState } from 'react';
import Head from 'next/head';
import LocationButton from '../../components/buttons/LocationButton';
import LocationDisplay from '../../components/location/LocationDisplay';

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start mt-0">
      <h1 className="text-3xl font-semibold text-gray-900 my-4">現在位置取得アプリ</h1>
      <LocationButton label={"位置情報取得"} onClick={getLocation} />
      {/* <LocationButton label={"監視開始"} onClick={startWatching} />
      <LocationButton label={"監視停止"} onClick={stopWatching} /> */}
      <LocationDisplay latitude={latitude} longitude={longitude} />
    </div>
  );
}