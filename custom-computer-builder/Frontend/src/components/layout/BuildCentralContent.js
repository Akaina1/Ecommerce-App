import React from 'react';
import { Container } from '@mui/material';
import svgArray from '../common/CustomBuildSVG';
import PartSlot from '../common/PartSlot'; // Make sure the import path is correct

function BuildCentralContent({ aestheticState }) {
  return (
    <Container maxWidth={false} className="build-central-content">
      {svgArray.map((svg) => {
        let opacity = aestheticState[svg.id] ? 1 : 0;
        // Check if the part is customizable
        const isCustomizable = [
          'frontViewEmpty',
          'case',
          'CPU',
          'GPU',
          'MOBO',
          'PSU',
          'RAM',
          'SSD',
          'HDD',
          'frontFans',
          'backFans'
        ].includes(svg.id);

        if (isCustomizable) {
          // Render a PartSlot component for customizable parts
          return <PartSlot 
            key={svg.id} 
            className={svg.id} 
            partType={svg.id} 
            partSVG={svg.src} />;
        } else {
          // Otherwise render it as a regular image
          return <img 
            key={svg.id} id={svg.id} 
            className={svg.id} 
            src={svg.src} 
            alt={svg.alt}  
            style={{ opacity }} />;
        }
      })}
    </Container>
  );
}

export default BuildCentralContent;