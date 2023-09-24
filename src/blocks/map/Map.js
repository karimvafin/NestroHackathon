import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadsData } from '../../assets/roads';

function Map() {
  const mapOptions = {
    center: { lat: 43.66293, lng: -79.39314 },
    zoom: 10,
    disableDefaultUI: true,
  };

  const [map, setMap] = useState();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMap = () => {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    };

    // Проверяем наличие window.google.maps
    if (!window.google || !window.google.maps) {
      // Если библиотека Google Maps ещё не загружена, загрузите её асинхронно
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0&libraries=places`;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      // Если библиотека Google Maps уже загружена, инициализируем карту сразу
      loadMap();
    }
  }, []);

  const createRoads = (map) => {
    roadsData.forEach(({ id, coordinates }) => {
      const roads = new window.google.maps.Polyline({
        id: id,
        path: coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      roads.setMap(map);

      window.google.maps.event.addListener(roads, 'click', function(e) {
        console.log(e);
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const id = roadsData.find((el) => el.coordinates.some((obj) => obj.lat === lat && obj.lng === lng ))?.id;
        console.log(id);

        navigate(`/results?lng=${lng}&lat=${lat}`);
      });
    });
  };

  useEffect(() => {
    if (map) {
      createRoads(map);
    }
  }, [map]);

  return (
    <>
      <div ref={ref} id="map" style={{ width: '80%', height: '100vh' }} />
    </>
  );
}

export default Map;
