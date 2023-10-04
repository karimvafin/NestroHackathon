import axios from 'axios';
import Header from 'components/Headers/Header.js';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'reactstrap';
import './Result.css'

const Maps = () => {
  const mapOptions = {
    center: { lat: 43.63135, lng: 18.00165 },
    zoom: 10,
    disableDefaultUI: true,
  };

  const [map, setMap] = useState();
  const mapRef = useRef(null); 
  const bestPlacesMapRef = useRef(null); 
  const navigate = useNavigate();

  const src = "https://nestrohackathon.pavel0dibr.repl.co/main";

  const [data, setData] = useState([]);
  const [bestPlacesData, setBestPlacesData] = useState([]);
  const [bestPlacesMarkers, setBestPlacesMarkers] = useState([]);

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

  useEffect(() => {
    axios
      .get("https://nestrohackathon.pavel0dibr.repl.co/best_places")
      .then(response => {
        console.log(response.data);
        setBestPlacesData(response.data);

        if (bestPlacesMapRef.current) {
          createBestPlaceMarkers(bestPlacesMapRef.current, response.data);
        }
      })
      .catch(error => {
        console.error('Ошибка при получении данных о "best_place":', error);
      });
  }, [bestPlacesMapRef]);

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

  const createBestPlaceMarkers = (map, data) => {
    const markers = data.map(place => {
      const [lat, lng] = place.best_place
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map(parseFloat);
  
      let markerIcon = null;
  
      if (place.total_revenue < 5000) {
        markerIcon = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      } else if (place.total_revenue < 10000) {
        markerIcon = 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png';
      } else {
        markerIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
      }
  
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        // title: `Best Place (${lat}, ${lng})`,
        icon: {
          url: markerIcon,
        },
      });
  
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div>
                    <p>Best Place: ${place.best_place}</p>
                    <p>Total Revenue: ${place.total_revenue}</p>
                 </div>`
      });
  
      marker.addListener('mouseover', () => {
        infoWindow.open(map, marker);
      });
  
      marker.addListener('mouseout', () => {
        infoWindow.close();
      });
  
      marker.addListener('click', () => {
        
      });
  
      return marker;
    });
  
    setBestPlacesMarkers(markers);
  };

  useEffect(() => {
    const loadMaps = () => {
      setMap(new window.google.maps.Map(mapRef.current, mapOptions));

      if (!bestPlacesMapRef.current) {
        bestPlacesMapRef.current = new window.google.maps.Map(
          document.getElementById("best-places-map"),
          mapOptions
        );
      }
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0&libraries=places`; 
      script.onload = loadMaps;
      document.head.appendChild(script);
    } else {
      loadMaps();
    }
  }, []);

  useEffect(() => {
    if (map) {
      createRoads(map, data);
    }
  }, [map, data]);

  useEffect(() => {
    if (bestPlacesMapRef.current) {
      createBestPlaceMarkers(bestPlacesMapRef.current, bestPlacesData);
    }
  }, [bestPlacesMapRef, bestPlacesData]);

  const getGradientColor = (rating) => {
    const value1 = Math.round(rating * 255);
    const value2 = Math.round((1 - rating) * 255);

    const r = 0;
    const g = value2;
    const b = 254;

    const redHex = r.toString(16).padStart(2, '0');
    const greenHex = g.toString(16).padStart(2, '0');
    const blueHex = b.toString(16).padStart(2, '0');

    return `#${redHex}${greenHex}${blueHex}`;
  };
  
  useEffect(() => {
    const gradientLegend = document.querySelector(".gradient-legend");
    const popup = document.createElement("div");
    popup.className = "popup";
    document.body.appendChild(popup);

    gradientLegend.addEventListener("mousemove", (e) => {
      const x = e.clientX - gradientLegend.getBoundingClientRect().left;
      const percent = (x / gradientLegend.clientWidth) * 100;
      popup.style.left = `${percent}%`;
      popup.style.display = "block";
      popup.innerText = `${Math.round(percent)}%`;
    });

    gradientLegend.addEventListener("mouseout", () => {
      popup.style.display = "none";
    });
  }, []);


  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Col>
          <div className="col">
            <Card className="shadow border-0">
              <div ref={mapRef} style={{ width: '100%', height: '150vh' }} />
            </Card>
            <div className='block-styles'></div>
            <div
              className="gradient-legend"
            >
              {/* Текст "Низкий рейтинг" и "Высокий рейтинг" */}
              <div className="gradient-legend-low">Низкий рейтинг</div>
              {/* Элементы полоски с градиентом */}
              <div className="gradient-legend-bar"></div>
              <div className="gradient-legend-high">Высокий рейтинг</div>
            </div>
            <div className='block-styles'></div>
            <Card>
              <div id="best-places-map" style={{ width: '100%', height: '150vh' }} />
            </Card>
            <div className='block-styles'></div>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default Maps;
