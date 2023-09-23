import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export const Block1 = ({ points, onMarkerClick }) => {
  return (
    <div className="block1">
      <MapContainer center={[50.906, 34.793991999999996]} zoom={13} style={{ width: '800px', height: '600px' }} preferCanvas={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {points.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            onClick={() => onMarkerClick(point.id)}
          >
            <Popup>{point.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
