import React from 'react';

export const MapContainer = ({ center, zoom, points, onMarkerClick }) => {
  return (
    <div id="map" style={{ height: '600px', width: '800px' }}></div>
  );
};
