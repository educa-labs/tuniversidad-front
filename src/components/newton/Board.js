import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectInput from '../inputs/SelectInput';
import ExpandibleCard from '../ExpandibleCard';
import { getOptions } from '../../helpers/strings';

const DashBoard = ({
  careers,
  handleChange,
  areas,
  selectedArea,
  onSelectArea,
  handlePredictionAreaChange,
  handlePredictionScoreChange,
  predictionArea,
  predictionScore,
  onRecomend,
}) => (
  <section className="newton-fullscreen">
    <div className="col col-3 padding-2">
      <div className="search-feedback">Anteriormente recomendadas</div>
      {careers.map(car => (
        <ExpandibleCard key={car.id} career={car} />
      ))}
    </div>
    <div className="col padding-2">
      <div className="search-feedback">Parámetros</div>
      <div className="expandible-card padding-1">
        <div className="title">Puntaje</div>
        <RadioButtonGroup
          name="prediction"
          valueSelected={predictionScore}
          onChange={(e, value) => handlePredictionScoreChange(value)}
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
        <div className="title">Área</div>
        <RadioButtonGroup
          name="prediction"
          valueSelected={predictionArea}
          onChange={(e, value) => handlePredictionAreaChange(value)}
        >
          <RadioButton
            value="goals"
            label="Usar mis metas"
          />
          <RadioButton
            value="manual"
            label="Seleccionar un área"
          />
        </RadioButtonGroup>
        {predictionArea === 'manual' ? (
          <SelectInput
            title="Area"
            items={getOptions(areas)}
            value={selectedArea}
            handleChange={onSelectArea}
            fullWidth
          />
        ) : null}
      </div>
      <div className="padding-2">
        <RaisedButton
          label="Recomiéndame"
          backgroundColor="#0091EA"
          labelColor="#FFFFFF"
          onTouchTap={onRecomend}
          disabled={predictionArea === 'manual' && selectedArea === null}
          fullWidth
        />
      </div>
    </div>
  </section>
);

export default DashBoard;
