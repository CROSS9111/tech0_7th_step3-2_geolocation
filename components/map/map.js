import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "86vh",
};

const center = {
    lat: 34.7025,
    lng: 137.7348,
};

const zoom = 13;

const Map = ({ positions }) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
            // マーカーの範囲にマップをフィットさせる
            const bounds = new window.google.maps.LatLngBounds();
            positions.forEach(position => {
                bounds.extend(new window.google.maps.LatLng(position[0], position[1]));
            });
            map.fitBounds(bounds);
        }
    }, [map, positions]);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={map => setMap(map)}
            >
                {positions.map((position, index) => (
                    <Marker
                        key={index}
                        position={{ lat: position[0], lng: position[1] }}
                    />
                ))}
                <Polyline
                    path={positions.map(position => ({
                        lat: position[0],
                        lng: position[1]
                    }))}
                    options={{ strokeColor: "#FF0000", strokeOpacity: 1, strokeWeight: 2 }}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
