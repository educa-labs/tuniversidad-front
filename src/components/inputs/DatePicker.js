import React, { Component, PropTypes } from 'react';
import SelectInput from './SelectInput';

const months = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', text: 'Sept', value: 9 },
  { text: 'Octubre', value: 10, label: 'Oct' },
  { text: 'Noviembre', value: 11, label: 'Nov' },
  { text: 'Diciembre', value: 12, label: 'Dic' },
];

const getDays = () => {
  const days = [];
  for (let i = 1; i <= 31; i ++) {
    days.push({ label: i.toString(), value: i });
  }
  return days;
};

const getYears = () => {
  const years = [];
  for (let i = 1980; i <= 2017; i ++) {
    years.push({ label: i.toString(), value: i});
  }
  return years;
};

class DatePicker extends Component {
  componentWillMount() {
    const date = this.props.date ? this.props.date.split('-') : [null, null, null];
    this.setState({
      day: date[0] ? Number(date[0]) : null,
      month: date[1] ? Number(date[1]) : null,
      year: date[2] ? Number(date[2]) : this.props.year || null,
    });
  }

  onChange(field, val) {
    this.setState({ [field]: val }, () => {
      const { day, month, year } = this.state;
      this.props.handleChange(`${day}-${month}-${year}`);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <SelectInput
            items={getDays()}
            handleChange={val => this.onChange('day', val)}
            value={this.state.day}
            floatingLabelText="Dia"
            floatingLabelFixed={this.props.fixed}
            hintText="17"
            maxHeight={180}
            errorText={this.props.errorText}
            fullWidth
          />
        </div>
        <div className="col col-2">
          <SelectInput
            items={months}
            handleChange={val => this.onChange('month', val)}
            value={this.state.month}
            hintText="Agosto"
            floatingLabelText="Mes"
            floatingLabelFixed={this.props.fixed}
            fullWidth
            maxHeight={180}
          />
        </div>
        {this.props.mobile ? null : (
          <div className="col">
            <SelectInput
              fullWidth
              items={getYears()}
              handleChange={val => this.onChange('year', val)}
              value={this.state.year}
              hintText="2017"
              floatingLabelText="Año"
              floatingLabelFixed={this.props.fixed}
              maxHeight={180}
            />
          </div>

        )}
      </div>
    );
  }
}

DatePicker.defaultProps = {
  date: null,
  year: null,
  errorText: '',
};

DatePicker.propTypes = {
  date: PropTypes.string,
  errorText: PropTypes.string,
};

export default DatePicker;
