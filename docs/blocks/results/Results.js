import queryString from "query-string";
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardType, CardWrapper } from '../../components/cards/Card';
import DoughnutChart from '../../components/chart/DoughnutChart';
import './Results.css';

export const Results = () => {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const initialLatLng = { lat: parseFloat(params.lat), lng: parseFloat(params.lng) };
  const mapRef = useRef(null);

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
  console.log(id)
  console.log(number)

  return (
    <div className="results-page">
      <div className="text-block">
        <div className="text-block__white">
          <div className='block2-text2'>Results</div>
        </div>
      </div>
      <div className="chart-container">
        <div className='block' ref={mapRef} style={{ width: '1000px', height: '400px' }}></div>
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
      </div>
    </div>
  );
};
