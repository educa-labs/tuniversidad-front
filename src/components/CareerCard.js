import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';


function CareerCard({ career }) {
  return (
    <Paper zDepth={3}>
      <div className="paper">
        Hola amigos
      </div>
    </Paper>
  );
}

CareerCard.propTypes = {
  career: PropTypes.object.isRequired,
};

export default CareerCard;
