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
      chart: <DoughnutChart color={'#C2CDFF'} />,
      text: <div className="card-text">Clients: 194.6725352343115,</div>,
    },
    {
      chart: <DoughnutChart color={'#FFE7C8'} />,
      text: <div className="card-text">Potential: 4.625905778954599</div>,
    },
    {
      chart: <DoughnutChart color={'#FFD5D2'} />,
      text: <div className="card-text">Best place: 44.94287, 18.67867</div>,
    },
    {
      chart: <DoughnutChart  color={'#FFD5D2'} />,
      text: <div className="card-text">Oil revenue: 53061.89292881628</div>,
    },
    {
      chart: <DoughnutChart color={'#FFD5D2'} />,
      text: <div className="card-text">Das revenue: 5306.189292881629</div>,
    },
  ];

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


  return (
    <div className="results-page">
      <div className="chart-container">
        <div className='block' ref={mapRef} style={{ width: '800px', height: '400px' }}></div>
      </div>
      {/* <div className='results-text'>Результаты</div>
      <div className='results-text'>name:Lončari - Pelagićevo</div> */}
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
      <div className='results-text1'>

    </div>
    {data && (
        <div className="response-data">
          <p>Данные с бэкенда:</p>
          <p>Name: {data.name}</p>
          <p>Road Coords: {data.road_coords}</p>
          <p>Length: {data.leng}</p>
          <p>Cities: {data.cities}</p>
          <p>Malls: {data.malls}</p>
          <p>Other Stations: {data.other_stations}</p>
          <p>Potential: {data.potential}</p>
          <p>Best Place: {data.best_place}</p>
          <p>Clients: {data.clients}</p>
          <p>Oil Revenue: {data.oil_revenue}</p>
          <p>DAS Revenue: {data.das_revenue}</p>
        </div>
      )}
    </div>
  );
};

export default Results;
