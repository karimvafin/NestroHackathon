import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row } from 'reactstrap';
import Header from 'components/Headers/Header.js';

const Maps = () => {
  const mapOptions = {
    center: { lat: 43.63135, lng: 18.00165 },
    zoom: 10,
    disableDefaultUI: true,
  };

  const [map, setMap] = useState();
  const ref = useRef();
  const navigate = useNavigate();

  const src = "https://nestro2.pavel0dibr.repl.co/main";

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(src)
      .then(response => {
        console.log(response.data);
        setData(response.data);

        if (map) {
          createRoads(map, response.data);
        }
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [map]);

  const createRoads = (map, data) => {
    data.forEach(({ id, name, coordinates, rating }) => {
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
            const gradientColor = getGradientColor(rating); 

            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map: map,
              polylineOptions: {
                strokeColor: gradientColor, 
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

              navigate(`/admin/results?lng=${lng}&lat=${lat}&number=${name}&id=${id}`);
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
      createRoads(map, data);
    }
  }, [map, data]);

  const getGradientColor = (rating) => {
    const value = Math.round(rating * 255);

    const r = 1;
    const g = value;
    const b = 254;

    const redHex = r.toString(16).padStart(2, '0');
    const greenHex = g.toString(16).padStart(2, '0');
    const blueHex = b.toString(16).padStart(2, '0');

    return `#${redHex}${greenHex}${blueHex}`;
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <div ref={ref} id="map" style={{ width: '100%', height: '150vh' }} />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
