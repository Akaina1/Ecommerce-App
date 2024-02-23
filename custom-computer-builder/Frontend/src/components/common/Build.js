import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import '../SASS/Build.scss'; 

function Build({ build }) {
  const { parts, totalPrice } = build;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className="build-container">
        <Typography variant="h5" component="div">
          Build Details
        </Typography>
        <Typography className="total-price" variant="body1">
          Total Price: ${totalPrice}
        </Typography>

        <ul className="part-list">
          {Object.entries(parts).map(([partName, part]) => (
            <li key={partName} className="part-item">
              {`${partName}: ${part.name} - $${part.price}`}
            </li>
          ))}
        </ul>
      </Paper>
    </Grid>
  );
}

export default Build;