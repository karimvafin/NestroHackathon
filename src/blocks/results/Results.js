import { useParams, Link } from 'react-router-dom'; // Импорт Link
import './Results.css';
import { Card, CardType, CardWrapper } from '../../components/cards/Card';
import DoughnutChart from '../../components/chart/DoughnutChart';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import { roadsData } from '../../assets/roads';
import RoadMarkers from '../RoadMarkers';

export const Results = () => {
  const { roadId } = useParams(); 

  const selectedRoad = roadsData.find((road) => road.id === parseInt(roadId));

  const mapOptions = {
    center: selectedRoad.coordinates[0], 
    zoom: 14, 
  };

  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, mapOptions);

    return () => {
    };
  }, [roadId, selectedRoad]);

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


  return (
    <div className="results-page">
      <div className="chart-container">
        
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
