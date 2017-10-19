import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import AddFooter from '../utility/AddFooter';
import SelectInput from '../inputs/SelectInput';
import { getOptions } from '../../helpers/strings';

const NewtonTwo = ({ handleChange, predictionArea, selectedArea, onSelectArea, areas, mobile, disableGoalOption }) => (
  <section className={mobile ? 'newton-section-mobile' : 'newton-section'}>
    <div className="col">
      <div className="newton-header">¿Cómo determinamos tu área?</div>
      <div className="body">
        <RadioButtonGroup
          name="prediction"
          valueSelected={predictionArea}
          onChange={(e, value) => handleChange(value)}
        >
          <RadioButton
            value="goals"
            label="Determinar en base a mis metas"
            disabled={disableGoalOption}
          />
          <RadioButton
            value="manual"
            label="No tengo metas, ingresar manualmente"
          />
        </RadioButtonGroup>
        {predictionArea === 'manual' ? (
          <div className="padding-1">
            <SelectInput
              title="Area"
              items={getOptions(areas)}
              value={selectedArea}
              handleChange={onSelectArea}
              width="10rem"
            />
          </div>
        ) : null}
      </div>
    </div>
  </section>
);

NewtonTwo.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default AddFooter(NewtonTwo);
