import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import '../SASS/Build.scss'; // Import the SASS file

function Build({ build }) {
  const { parts, totalPrice } = build;

  return (
    <Paper className="build-container">
      <Typography variant="h5" component="div">
        Build Details
      </Typography>
      <Typography className="total-price" variant="body1">
        Total Price: ${totalPrice}
      </Typography>

      {/* Display details for each part */}
      <List className="part-list">
        {Object.entries(parts).map(([partName, part]) => (
          <ListItem key={partName} className="part-item">
            {`${partName}: ${part.name} - $${part.price}`}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

Build.propTypes = {
  build: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    parts: PropTypes.shape({
      CPU: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
      }),
      GPU: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
      }),
      // ... repeat for other parts
    }).isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default Build;