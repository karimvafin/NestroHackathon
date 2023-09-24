import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";

export const Block1 = () => {
  const mapOptions = {
    center: { lat: 43.66293, lng: -79.39314 },
    zoom: 10,
    disableDefaultUI: true,
  };

  function MyMap() {
    const [map, setMap] = useState();
    const ref = useRef();

    useEffect(() => {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }, []);

    useEffect(() => {
      if (map) {
        createMarkers(map);
        createRoads(map);
      }
    }, [map]);

    const createMarkers = (map) => {
      const marker = new window.google.maps.Marker({
        position: { lat: 43.651070, lng: -79.347015 }, 
        map: map,
        icon: {
          url: '../assets/marker.png',
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });

    };

    const createRoads = (map) => {
      const coordinates1 = [
        { lat: 43.651070, lng: -79.347015 },
        { lat: 43.652070, lng: -79.347015 },
      ];

      const coordinates2 = [
        { lat: 43.653070, lng: -79.348015 },
        { lat: 43.654070, lng: -79.348015 },
      ];

      const polyline1 = new window.google.maps.Polyline({
        path: coordinates1,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      const polyline2 = new window.google.maps.Polyline({
        path: coordinates2,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      polyline1.setMap(map);
      polyline2.setMap(map);
    };

    return (
      <>
        <div ref={ref} id="map" style={{ width: '800px', height: '600px' }} />
      </>
    );
  }

  return (
    <Wrapper
      apiKey="AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0"
      version="beta"
      libraries={["marker"]}
    >
      <MyMap />
    </Wrapper>
  );
};
