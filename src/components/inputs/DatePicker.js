import React, { Component, PropTypes } from 'react';
import SelectInput from './SelectInput';
import '../../styles/DatePicker.css';

const months = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 },
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
  for (let i = 1990; i <= 2010; i ++) {
    years.push({ label: i.toString(), value: i});
  }
  return years;
};

class DatePicker extends Component {
  componentWillMount() {
    const date = this.props.date ? this.props.date.split('-') : [null, null, null];
    this.setState({
      day: date[0],
      month: date[1] ? Number(date[1]) : null,
      year: date[2],
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
      <div className="date-picker">
        <div className="col col-1">
          <SelectInput
            items={getDays()}
            handleChange={val => this.onChange('day', val)}
            value={this.state.day}
            floatingLabelText="Día"
            hintText="Día"
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
            hintText="Mes"
            floatingLabelText="Mes"
            fullWidth
            maxHeight={180}
          />
        </div>
        <div className="col col-2">
          <SelectInput
            fullWidth
            items={getYears()}
            handleChange={val => this.onChange('year', val)}
            value={this.state.year}
            hintText="Año"
            floatingLabelText="Año"
            maxHeight={180}
          />
        </div>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  date: null,
};

DatePicker.propTypes = {
  date: PropTypes.string,
  errorText: PropTypes.string.isRequired,
};

export default DatePicker;
