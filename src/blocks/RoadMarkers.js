import React, { useEffect } from 'react';

const RoadMarkers = ({ map, roadCoordinates, selectedRoadId }) => {
  useEffect(() => {
    if (!map || !roadCoordinates) return;

    roadCoordinates.forEach((coordinate, index) => {
      const marker = new window.google.maps.Marker({
        position: coordinate,
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 5, 
          fillColor: selectedRoadId === index + 1 ? 'red' : 'blue', // Красный для выбранной дороги, синий для остальных
          fillOpacity: 1, 
          strokeWeight: 0, 
        },
      });
    });
  }, [map, roadCoordinates, selectedRoadId]);

  return null;
};

export default RoadMarkers;
