import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardType, CardWrapper } from '../../components/cards/Card';
import DoughnutChart from '../../components/chart/DoughnutChart';
import './Results.css';
import axios from 'axios'; 
import queryString from 'query-string';

export const Results = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const initialLatLng = { lat: parseFloat(params.lat), lng: parseFloat(params.lng) };
  const mapRef = useRef(null);
  const [responseData, setResponseData] = useState(null);

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

  const elements = [
    {
      chart: <DoughnutChart value={8} color={'#C2CDFF'} />,
      text: <div className="card-text">Текст 1</div>,
    },
    {
      chart: <DoughnutChart value={3} color={'#FFE7C8'} />,
      text: <div className="card-text">Текст 2</div>,
    },
    {
      chart: <DoughnutChart value={9} color={'#FFD5D2'} />,
      text: <div className="card-text">Текст 3</div>,
    },
  ];

  const number = params.number;
  const id = params.id;
  console.log(params.id)
  console.log(params.number)

  useEffect(() => {
    axios.get(`https://nestro.pavel0dibr.repl.co/road?id=${params.id}`, {

    })
      .then((response) => {
        setResponseData(response.data);
        console.log(response.data); 
      })
      .catch((error) => {
        console.error('Ошибка при отправке GET-запроса:', error);
      });
  }, [id]);

  return (
    <div className="results-page">
      <div className="chart-container">
        <div className='block' ref={mapRef} style={{ width: '800px', height: '400px' }}></div>
      </div>
      <div className='results-text'>Результаты</div>
      <CardWrapper>
        {elements.map((el, index) => (
          <Card
            key={index}
            chart={el.chart}
            text={el.text}
            cardType={CardType.FIRST}
          />
        ))}
      </CardWrapper>
      {responseData && (
      <div>
        <p>Данные с бэкенда:</p>
        <p>ID: {responseData.id}</p>
        <p>Name: {responseData.name}</p>
        <div>
          <p>Detail:</p>
          {responseData.detail.map((item, index) => (
            <div key={index}>
              <p>Loc: {item.loc.join(', ')}</p>
              <p>Msg: {item.msg}</p>
              <p>Type: {item.type}</p>
            </div>
          ))}
        </div>
      </div>
    )}
    </div>
  );
};

export default Results;
