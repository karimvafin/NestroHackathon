import { Tabs } from 'antd';
import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardType, CardWrapper } from '../../components/cards/Card';
import './Results.css';

export const Results = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const initialLatLng = { lat: parseFloat(params.lat), lng: parseFloat(params.lng) };
  const mapRef = useRef(null);
  const [responseData, setResponseData] = useState(null);
  const [roadCoordinates, setRoadCoordinates] = useState([]);
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0`;
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

        map.addListener('click', (event) => {
        });
      })
      .catch((error) => {
        console.error('Ошибка при загрузке Google Maps:', error);
      });
  }, []);

  const number = params.number;
  const id = params.id;
  console.log(params.id)
  // console.log(params.number)


  const src = `https://nestro.pavel0dibr.repl.co/road?id=${params.id}`;

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
    // {
    //   key: '4',
    //   label: 'Road coordinates',
    //   children: data ? data.road_cords : "loading",
    // },
  ];

  return (
    <div className="results-page">
      <p className='results-title'>{data.name}</p>
      <div className="chart-container">
        <div className='block' ref={mapRef} style={{ width: '84%', height: '600px' }}></div>
      </div>
      {/* <div className='results-text'>Результаты</div>
      <div className='results-text'>name:Lončari - Pelagićevo</div> */}
      <CardWrapper>
        {dataCards.map((d, index) => (
          <Card
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
  );
};

export default Results;
