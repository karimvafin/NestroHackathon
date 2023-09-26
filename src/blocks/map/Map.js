import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadsData } from '../../assets/utils/roads';

function Map() {
  const mapOptions = {
    center: { lat: 43.66293, lng: -79.39314 }, 
    zoom: 100,
    disableDefaultUI: true,
  };

  const [map, setMap] = useState();
  const ref = useRef();
  const navigate = useNavigate();

  const createRoads = (map) => {
    roadsData.forEach(({ id, name, coordinates }) => {
      if (coordinates.length >= 2) {
        const start = new window.google.maps.LatLng(coordinates[0].lat, coordinates[0].lng);
        const end = new window.google.maps.LatLng(coordinates[1].lat, coordinates[1].lng);

        const request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING',
        };

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(request, (response, status) => {
          if (status === 'OK') {
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map: map,
              polylineOptions: {
                strokeColor: '#FF0000', 
                strokeOpacity: 1.0,
                strokeWeight: 10,
              },
              suppressMarkers: true,
            });

            directionsRenderer.setDirections(response);

            const routePolyline = directionsRenderer.getDirections().routes[0].overview_polyline;
            const path = window.google.maps.geometry.encoding.decodePath(routePolyline);

            const roadPolyline = new window.google.maps.Polyline({
              path: path,
              clickable: true,
            });

            roadPolyline.set("roadId", id);
            roadPolyline.set("roadName", name);

            roadPolyline.setMap(map);

            window.google.maps.event.addListener(roadPolyline, 'click', function (e) {
              const latLng = e.latLng;
              const lat = latLng.lat();
              const lng = latLng.lng();
              const id = roadPolyline.get("roadId");
              const name = roadPolyline.get("roadName");
              console.log(`ID: ${id}, Name: ${name}`);
              
              navigate(`/results?lng=${lng}&lat=${lat}&number=${name}&id=${id}`);
            });
          } else {
            console.error('Directions request failed:', status);
          }
        });
      }
    });
  };

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

  useEffect(() => {
    if (map) {
      createRoads(map);
    }
  }, [map]);

  return (
    <>
      <div ref={ref} id="map" style={{ width: '100%', height: '150vh' }} />
    </>
  );
}

export default Map;
