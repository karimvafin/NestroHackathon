import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Tabs } from 'antd';
import axios from 'axios';
import queryString from 'query-string';
import { CardType, Cards, CardWrapper } from 'components/cards/Card';
import { Card, Container, Row } from 'reactstrap';
import './Result.css';

import Header from "components/Headers/Header.js";

const Results = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const initialLatLng = { lat: parseFloat(params.lat), lng: parseFloat(params.lng) };
  const mapRef = useRef(null);
  const [bestPlaceLatLng, setBestPlaceLatLng] = useState(null);
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0`; // Замените YOUR_API_KEY на ваш ключ API
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };
  
    loadGoogleMaps()
      .then(() => {
        const mapOptions = {
          center: initialLatLng,
          zoom: 15,
          disableDefaultUI: true,
        };
  
        const map = new window.google.maps.Map(mapRef.current, mapOptions);
  
        const marker = new window.google.maps.Marker({
          position: initialLatLng,
          map: map,
        });
  
        marker.addListener('click', () => {

        });
  
        if (bestPlaceLatLng) {
          const bestPlaceMarker = new window.google.maps.Marker({
            position: bestPlaceLatLng,
            map: map,
          });
  
          bestPlaceMarker.addListener('click', () => {
            console.log("Координаты точки Best Place:");
            console.log("Широта:", bestPlaceLatLng.lat);
            console.log("Долгота:", bestPlaceLatLng.lng);
          });
        }
      })
      .catch((error) => {
        console.error('Ошибка при загрузке Google Maps:', error);
      });
  }, [bestPlaceLatLng]);

  const number = params.number;
  const id = params.id;

  const src = `https://nestrohackathon.pavel0dibr.repl.co/road?id=${params.id}`;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(src)
      .then(response => {
        console.log(response.data);
        setData(response.data);

        if (response.data.best_place) {
          const [lat, lng] = response.data.best_place.split(',').map(parseFloat);
          const bestPlaceLatLng = { lat, lng };
          setBestPlaceLatLng(bestPlaceLatLng);
        }
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  const dataCards = [
    {
      title: "Clients:",
      text: data ? data.clients : "loading"
    },
    {
      title: "Length:",
      text: data ? data.leng : "loading"
    },
    {
      title: "Best place:",
      text: data ? data.best_place : "loading"
    },
    {
      title: "Oil revenue:",
      text: data ? data.oil_revenue : "loading"
    },
    {
      title: "Das revenue:",
      text: data ? data.das_revenue : "loading"
    }
  ];

  const items = [
    {
      key: '1',
      label: 'Cities',
      children: data ? data.cities : "loading",
    },
    {
      key: '2',
      label: 'Malls',
      children: data ? data.malls : "loading",
    },
    {
      key: '3',
      label: 'Other Stations',
      children: data ? data.other_stations : "loading",
    },
    {
      key: '4',
      label: 'Car service',
      children: data ? data.car_service : "loading",
    },
    {
      key: '5',
      label: 'Parking',
      children: data ? data.parking : "loading",
    },
    {
      key: '6',
      label: 'Total revenue',
      children: data ? data.total_revenue : "loading",
    }
  ];

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <div className="col">
                <Card className="shadow border-0">
                  <div className="results-page">
                    <p className='results-title'>{data.name}</p>
                    <div className="chart-container">
                      <div className='block' ref={mapRef} style={{ width: '100%', height: '600px' }}></div>
                    </div>
                    <CardWrapper>
                      {dataCards.map((d, index) => (
                        <Cards
                          title={d.title}
                          text={d.text}
                          cardType={CardType.FIRST}
                        />
                      ))}
                    </CardWrapper>
                    <div className='results-text1'>
                      <div className="response-data">
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Results;
