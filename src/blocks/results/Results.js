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
      <div className='results-text'>name:Lončari - Pelagićevo</div>
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
      <div className='results-text1'>'leng':7.28</div>
<div className='results-text1'>'cities':Series([], Name: City, dtype: object)', 'malls': '357Б</div>
<div className='left-wrapper'>
road_coords:
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li>(44.94287, 18.67867)</li>
    <li>(44.94272, 18.67861)</li>
    <li>(44.94213, 18.6783)</li>
    <li>(44.94095, 18.67768)</li>
    <li>(44.94085, 18.67761)</li>
    <li>(44.93972, 18.67692)</li>
    <li>(44.9393, 18.67662)</li>
    <li>(44.93785, 18.67562)</li>
    <li>(44.93767, 18.6755)</li>
    <li>(44.93672, 18.67481)</li>
    <li>(44.9367, 18.67479)</li>
    <li>(44.93611, 18.67434)</li>
    <li>(44.93539, 18.67377)</li>
    <li>(44.93515, 18.67358)</li>
    <li>(44.93468, 18.6732)</li>
    <li>(44.93324, 18.67199)</li>
    <li>(44.93291, 18.6717)</li>
    <li>(44.93216, 18.67102)</li>
    <li>(44.93119, 18.67008)</li>
    <li>(44.9309, 18.6698)</li>
    <li>(44.93062, 18.66952)</li>
    <li>(44.93034, 18.66923)</li>
    <li>(44.93007, 18.66894)</li>
    <li>(44.9298, 18.66864)</li>
    <li>(44.92952, 18.66834)</li>
    <li>(44.92926, 18.66804)</li>
    <li>(44.92899, 18.66773)</li>
    <li>(44.92873, 18.66741)</li>
    <li>(44.92831, 18.6669)</li>
    <li>(44.92811, 18.66664)</li>
    <li>(44.92722, 18.66546)</li>
    <li>(44.92676, 18.6649)</li>
    <li>(44.92622, 18.66412)</li>
    <li>(44.92597, 18.66378)</li>
    <li>(44.92564, 18.66328)</li>
    <li>(44.92494, 18.66218)</li>
    <li>(44.92372, 18.66017)</li>
    <li>(44.92331, 18.65947)</li>
    <li>(44.92309, 18.65909)</li>
    <li>(44.92286, 18.6587)</li>
    <li>(44.92264, 18.65831)</li>
    <li>(44.92241, 18.65792)</li>
    <li>(44.9222, 18.65753)</li>
    <li>(44.92198, 18.65713)</li>
    <li>(44.92175, 18.6567)</li>
    <li>(44.92153, 18.65626)</li>
    <li>(44.92131, 18.65583)</li>
    <li>(44.92109, 18.65539)</li>
    <li>(44.92015, 18.65353)</li>
    <li>(44.91935, 18.65183)</li>
  </ul>
</div>
</div>

      {/* <div className='results-text'>potential:4.625905778954599</div>
      <div className='results-text'>best_place:'(44.94287, 18.67867)</div> */}
      {/* {responseData && (
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
    )} */}
    </div>
  );
};

export default Results;
