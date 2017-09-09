import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const Nem = ({
  handleNemChange,
  handleRankingChange,
  nem,
  ranking,
  error,
}) => (
  <div className="slide">
    <div className="slide-header">¿Cuáles son tus puntajes de enseñanza media?</div>
    <div className="slide-body">
      <div className="slide-col">
        <p>Ingresa los puntajes que crees que sacarás, por ejemplo 650.</p>
        <TextField
          onChange={(e, val) => handleNemChange(val)}
          floatingLabelText="Nem"
          hintText="650"
          value={nem}
          type="number"
          errorText={error.nem}
          fullWidth
        />
        <TextField
          onChange={(e, val) => handleRankingChange(val)}
          floatingLabelText="Ranking"
          hintText="650"
          value={ranking}
          type="number"
          errorText={error.ranking}
          fullWidth
        />
      </div>
    </div>
  </div>
);

Nem.propTypes = {
  handleNemChange: PropTypes.func.isRequired,
  handleRankingChange: PropTypes.func.isRequired,
  nem: PropTypes.string.isRequired,
  ranking: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default Nem;
