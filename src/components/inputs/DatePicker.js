import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
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
        <SelectInput
          items={getDays()}
          handleChange={val => this.onChange('day', val)}
          value={this.state.day}
          hintText="Día"
          maxHeight={180}
          errorText={this.props.errorText}
        />
        <SelectInput
          items={months}
          handleChange={val => this.onChange('month', val)}
          value={this.state.month}
          hintText="Mes"
          maxHeight={180}
        />
        <SelectInput
          items={getYears()}
          handleChange={val => this.onChange('year', val)}
          value={this.state.year}
          hintText="Año"
          maxHeight={180}
        />
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
