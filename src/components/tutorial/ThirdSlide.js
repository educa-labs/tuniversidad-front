import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectInput from '../inputs/SelectInput';

const items = [
  { label: 'Sí', value: 1 },
  { label: 'No', value: 2 },
];

const Third = ({
  handlePhoneChange,
  handlePreuChange,
  phone,
  preu,
  error,
}) => (
  <div className="slide">
    <div className="slide-header">Cuéntanos de ti</div>
    <div className="slide-body">
      <div className="slide-col">
        <TextField
          onChange={(e, val) => handlePhoneChange(val)}
          floatingLabelText="Teléfono"
          hintText="961403258"
          value={phone}
          errorText={error.phone || ''}
          fullWidth
        />
        <div className="input-help">Ejemplo: 961403258</div>
        <SelectInput
          title="Preuniversitario"
          items={items}
          value={preu}
          handleChange={res => handlePreuChange(res)}
        />
      </div>
    </div>
  </div>
);


Third.propTypes = {
  handlePhoneChange: PropTypes.func.isRequired,
  handlePreuChange: PropTypes.func.isRequired,
  preu: PropTypes.number,
  phone: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default Third;
