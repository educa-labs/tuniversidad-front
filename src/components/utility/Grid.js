import React from 'react';
import PropTypes from 'prop-types';

function Grid({ children, mobile, columns }) {
  console.log(children);
  function generateCols() {
    if (mobile) {
      return (
        <div className="col">
          {children}
        </div>
      );
    }
    const res = [];
    for (let i = 0; i < columns; i += 1) {
      res[i] = [];
    }
    children.forEach((item, index) => {
      const i = index % columns;
      res[i].push(item);
    });
    console.log(res);
    const result = [];
    res.forEach((col, index) => result.push(
      <div className="col" key={index}>
        {col}
      </div>,
    ));
    console.log(result);
    return result;
  }
  return (
    <div className="row">
      {generateCols()}
    </div>
  );
}

Grid.defaultProps = {
  mobile: false,
};

Grid.propTypes = {
  mobile: PropTypes.bool,
  columns: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Grid;
