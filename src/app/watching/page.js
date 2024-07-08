"use client"

import Image from "next/image";
import { useState } from 'react';
import Head from 'next/head';
import LocationButton from '../../../components/buttons/LocationButton';
import LocationDisplay from '../../../components/location/LocationDisplay';


const page = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [watchId, setWatchId] = useState(null);

    const startWatching = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error("Error watching location: ", error);
            },
            { enableHighAccuracy: true }
            );
            setWatchId(id);
            console.log(watchId)
            console.log(latitude)
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
        };
    
        const stopWatching = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
            console.log(watchId)
        }
        };


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start mt-0">
      <h1 className="text-3xl font-semibold text-gray-900 my-4">現在位置監視</h1>
      <LocationButton label={"監視開始"} onClick={startWatching} />
      <LocationButton label={"監視停止"} onClick={stopWatching} />
      <LocationDisplay latitude={latitude} longitude={longitude} />
    </div>
  )
}

export default page
