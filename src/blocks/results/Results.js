import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Results.css';
import { Card, CardType, CardWrapper } from '../../components/cards/Card';
import DoughnutChart from '../../components/chart/DoughnutChart';
import { Marker, Popup, TileLayer } from 'react-leaflet';

export const Results = () => {
  const { pointId } = useParams();
  const navigate = useNavigate();

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

  const points = [
    {
      id: 1,
      lat: 50.906,
      lng: 34.793991999999996,
      label: 'Точка 1',
    },
  ];

  const handleMarkerClick = (pointId) => {
    navigate(`/results/${pointId}`);
  };

  return (
    <div className="results-page">
      <div className="chart-container">
        <div className="block">
        </div>
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
