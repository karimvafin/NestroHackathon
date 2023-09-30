import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom"
import { Tabs } from 'antd';
import axios from 'axios';
import queryString from 'query-string';
import { CardType, Cards, CardWrapper } from 'components/cards/Card';
import { Card, Container, Row } from 'reactstrap';
import './Result.css'

// reactstrap components
import {
  // Card,
  CardHeader,
  CardBody,
  // Container,
  // Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Results = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const initialLatLng = { lat: parseFloat(params.lat), lng: parseFloat(params.lng) };
  const mapRef = useRef(null);
  const [responseData, setResponseData] = useState(null);
  const [roadCoordinates, setRoadCoordinates] = useState([]);
  const onChange = (key) => {
    console.log(key);
  };
  const [bestPlaceLatLng, setBestPlaceLatLng] = useState(null);

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

        if (params.best_place) {
          const [lat, lng] = params.best_place.split(',').map(parseFloat);
          const bestPlaceLatLng = { lat, lng };

          const bestPlaceMarker = new window.google.maps.Marker({
            position: bestPlaceLatLng,
            map: map,
          });

          bestPlaceMarker.addListener('click', () => {
            
          });

          setBestPlaceLatLng(bestPlaceLatLng);
        }
      })
      .catch((error) => {
        console.error('Ошибка при загрузке Google Maps:', error);
      });
  }, [params]);

  const number = params.number;
  const id = params.id;
  console.log(params.id)
  // console.log(params.number)

  const src = `https://nestro2.pavel0dibr.repl.co/road?id=${params.id}`;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(src)
      .then(response => {
        console.log(response.data);
        setData(response.data);

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
  ]

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
  ];

  return (
      <>
      <Header />
      {/* Page content */}
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
