import { Wrapper } from "@googlemaps/react-wrapper";
import React from 'react';
import Map from '../map/Map';

export const Block1 = () => {
  
  return (
    <Wrapper
      apiKey="AIzaSyB7ggCeswm2Oq7JqVR6qXE1l5Ua631yFo0"
      version="beta"
      libraries={["marker"]}
    >
      <Map />
    </Wrapper>
  );
};
