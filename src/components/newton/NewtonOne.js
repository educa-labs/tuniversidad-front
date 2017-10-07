import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import AddFooter from '../utility/AddFooter';

const NewtonOne = ({ handleChange, predictionScore }) => (
  <section className="newton-section">
    <div className="col">
      <div className="title">¿De qué forma predecimos tus puntajes?</div>
      <div className="body">
        <RadioButtonGroup
          name="prediction"
          valueSelected={predictionScore}
          onChange={(e, value) => handleChange(value)}
        >
          <RadioButton
            value="essays"
            label="Usar mis ensayos"
          />
          <RadioButton
            value="goals"
            label="Usar mis puntajes meta"
          />
        </RadioButtonGroup>
      </div>
    </div>
  </section>
);

NewtonOne.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default AddFooter(NewtonOne);
