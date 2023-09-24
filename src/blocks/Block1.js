import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Block1 = ({ points }) => {
  const apiKey = 'AIzaSyAYMBaXIt_-PtQ2W2_oRMBDde022yKLNcA';
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 50.906, lng: 34.793991999999996 },
      zoom: 10,
      mapTypeControl: false, 
    });

    points.forEach((point) => {
      new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: map,
        title: point.label,
      });
    });
  }, [points]);

  return (
    <div className="block1">
      <div
        ref={mapRef}
        style={{ width: '800px', height: '600px', border: '0' }}
      ></div>
      <div>
        {points.map((point) => (
          <div key={point.id}>
            {/* <Link to={`/results/${point.id}`}>{point.label}</Link> */}
            <Link to={`/results`}>{point.label}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
