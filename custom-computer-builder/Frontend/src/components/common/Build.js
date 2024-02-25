import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useBuild } from '../common/BuildProvider';
import '../SASS/Build.scss';

function Build({ build }) {
  const buildContext = useBuild();
  const navigate = useNavigate();

  const handleClick = () => {
    // Check if buildContext is truthy before navigating
    if (buildContext) {
      const { handleLoadBuild } = buildContext;
      handleLoadBuild(build);
      navigate('/custom-build');
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper className="build-container">
        <Typography variant="h5" component="div">
          Build Details
        </Typography>
        <Typography className="total-price" variant="body1">
          Total Price: ${build.totalPrice}
        </Typography>
        <ul className="part-list">
          {Object.entries(build.parts).map(([partName, part]) => (
            <li key={partName} className="part-item">
              {`${partName}: ${part.name} - $${part.price}`}
            </li>
          ))}
        </ul>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          Load Build
        </Button>
      </Paper>
    </Grid>
  );
}

export default Build;