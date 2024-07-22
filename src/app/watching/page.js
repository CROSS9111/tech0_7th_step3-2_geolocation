"use client"

import Image from "next/image";
import { useState,useEffect } from 'react';
import Head from 'next/head';
import LocationButton from '../../../components/buttons/LocationButton';
import LocationDisplay from '../../../components/location/LocationDisplay';


const Page = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [updateCount, setUpdateCount] = useState(0);
    const [userName, setUserName] = useState("");

    const sendDataToBackend = (userName, latitude, longitude) => {
        fetch('/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                latitude,
                longitude
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    

    const startWatching = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setUpdateCount(prevCount => prevCount + 1);
            },
            (error) => {
                console.error("Error watching location: ", error);
            },
            { 
                enableHighAccuracy: true,
                timeout: 5000, // 位置情報取得の試行を5秒でタイムアウトする
                maximumAge: 0 // キャッシュされた位置情報を使用しない 
            }
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
        setUserName("");
        };



        const handleUserNameChange = (event) => {
            setUserName(event.target.value);
        };

        useEffect(() => {
            const sendDataToBackend = async (userName, latitude, longitude) => {
                const payload = {
                    "user_name": userName,
                    "latitude":latitude,
                    "longitude":longitude
                };
                console.log(payload)
                try {
                    const response = await fetch("http://127.0.0.1:5000/locations", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({payload}),
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const data = await response.json();
                    console.log('Success:', data);
                } catch (error) {
                    console.error('Error:', error);
                }
            };
    
            if (updateCount > 0) {
                console.log(updateCount);
                sendDataToBackend(userName, latitude, longitude);
            }
        }, [updateCount]);


        return (
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start mt-0">
            <h1 className="text-3xl font-semibold text-gray-900 my-4">現在位置監視</h1>
            <input
                type="text"
                placeholder="ユーザー名を入力してください"
                value={userName}
                onChange={handleUserNameChange}
                className="border rounded p-2 mb-4"
            />
            <LocationButton
                label={"監視開始"}
                onClick={startWatching}
                disabled={!userName} // ユーザー名が空の場合はボタンを無効化
            />
            <LocationButton
                label={"監視停止"}
                onClick={stopWatching}
                disabled={!userName} // ユーザー名が空の場合はボタンを無効化
            />
            <LocationDisplay latitude={latitude} longitude={longitude} />
            <p className="text-lg text-gray-700 mt-3">更新回数: {updateCount}</p>
            </div>
        )
}

export default Page
