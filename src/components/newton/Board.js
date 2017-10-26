import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Help from 'material-ui/svg-icons/action/help';
import SelectInput from '../inputs/SelectInput';
import ExpandibleCard from '../ExpandibleCard';
import { getOptions } from '../../helpers/strings';
import Modal from './HowItWorks';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {
      history,
      handleChange,
      areas,
      selectedArea,
      onSelectArea,
      handlePredictionAreaChange,
      handlePredictionScoreChange,
      predictionArea,
      predictionScore,
      onRecomend,
      disableEssayOption,
      disableGoalOption,
      mobile
    } = this.props;
    return (
      <section className={mobile ? 'newton-fullscreen-mobile' : 'newton-fullscreen'}>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: !this.state.showModal })}
          mobile={mobile}
        />
        <div className={mobile ? 'order-2' : 'col col-3 padding-2'}>
          <div className="search-feedback">Anteriormente recomendadas</div>
          <div>
            {history.map(hist => (
              <ExpandibleCard key={hist.id} career={hist.carreer} />
            ))}
          </div>
        </div>
        <div className={mobile ? 'order-1' : 'col padding-2'}>
          <div className="search-feedback">Parámetros</div>
          <div className="expandible-card padding-1" style={{ paddingBottom: '10px' }}>
            <div className="newton-header">
              Puntaje
              <IconButton style={{ padding: '0 10px' }} onTouchTap={() => this.setState({ showModal: true })} >
                <Help color="#0091EA" />
              </IconButton>
            </div>
            <RadioButtonGroup
              name="prediction"
              valueSelected={predictionScore}
              onChange={(e, value) => handlePredictionScoreChange(value)}
            >
              <RadioButton
                value="essays"
                label="Usar mis ensayos"
                disabled={disableEssayOption}
              />
              <RadioButton
                value="objectives"
                label="Usar mis puntajes objetivos"
              />
            </RadioButtonGroup>
            <div className="newton-header">
              Área
            </div>
            <RadioButtonGroup
              name="prediction"
              valueSelected={predictionArea}
              onChange={(e, value) => handlePredictionAreaChange(value)}
            >
              <RadioButton
                value="goals"
                label="Usar mis metas"
                disabled={disableGoalOption}
              />
              <RadioButton
                value="manual"
                label="Seleccionar un área"
              />
            </RadioButtonGroup>
            {predictionArea === 'manual' ? (
              <SelectInput
                title="Area"
                items={getOptions(areas, true)}
                value={selectedArea}
                handleChange={onSelectArea}
                fullWidth
              />
            ) : null}
          </div>
          <div className={mobile ? '' : 'padding-2'} style={mobile ? {margin: '10px 0'} : null}>
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
  }
}


export default DashBoard;
