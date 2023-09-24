import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { drawRoad } from '../../assets/utils/drawRoad';
import { roadsData } from '../../assets/utils/roads';

function Map() {
  const mapOptions = {
    center: { lat: 43.66293, lng: -79.39314 },
    zoom: 0,
    disableDefaultUI: true,
  };

  const [map, setMap] = useState();
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMap = () => {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0&libraries=places`;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  const createRoads = (map) => {
    const directionsService = new window.google.maps.DirectionsService();

    roadsData.forEach(({ id, coordinates }) => {
      if (coordinates.length >= 2) {
        const start = new window.google.maps.LatLng(coordinates[0].lat, coordinates[0].lng);
        const end = new window.google.maps.LatLng(coordinates[1].lat, coordinates[1].lng);

        const request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING',
        };

        directionsService.route(request, (response, status) => {
          if (status === 'OK') {
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map: map,
              polylineOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 4,
              },
            });

            directionsRenderer.setDirections(response);

            const routePolyline = directionsRenderer.getDirections().routes[0].overview_polyline;
            const path = window.google.maps.geometry.encoding.decodePath(routePolyline);
            const clickablePolyline = new window.google.maps.Polyline({
              path: path,
              clickable: true,
            });
            clickablePolyline.setMap(map);

            window.google.maps.event.addListener(clickablePolyline, 'click', function (e) {
              const latLng = e.latLng;
              const lat = latLng.lat();
              const lng = latLng.lng();
              const id = findRoadIdByCoordinates(lat, lng);
              console.log(id);
              navigate(`/results?lng=${lng}&lat=${lat}`);
            });
          } else {
            console.error('Directions request failed:', status);
          }
        });
      }
    });
  };

  const findRoadIdByCoordinates = (lat, lng) => {
    for (const road of roadsData) {
      for (const coord of road.coordinates) {
        if (coord.lat === lat && coord.lng === lng) {
          return road.id;
        }
      }
    }
    return null;
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
