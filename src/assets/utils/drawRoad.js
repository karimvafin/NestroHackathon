export const drawRoad = (map, coordinates) => {
    const road = new window.google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
  
    road.setMap(map);
  };
  