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


class DatePicker extends Component {
  componentWillMount() {
    const date = this.props.date ? this.props.date.split('-') : [null, null, null];
    this.setState({
      day: date[0],
      month: Number(date[1]),
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
        <TextField
          onChange={(e, val) => this.onChange('day', val)}
          type="number"
          hintText="Día"
          value={this.state.day}
          style={{
            width: '3rem',
            marginRight: '3px',
          }}
        />
        <SelectInput
          items={months}
          handleChange={val => this.onChange('month', val)}
          value={this.state.month}
          hintText="Mes"
          maxHeight={180}
        />
        <TextField
          onChange={(e, val) => this.onChange('year', val)}
          type="number"
          hintText="Año"
          value={this.state.year}
          style={{
            width: '3rem',
            marginLeft: '3px',
          }}
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
};

export default DatePicker;
