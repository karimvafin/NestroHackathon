import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { TileLayer, Popup } from 'react-leaflet';

export const MapContainer =({ center, zoom, points, onMarkerClick }) => {
    return (
      <Map center={center} zoom={zoom} style={{ height: '600px', width: '800px' }}>
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
      </Map>
    );
  };