import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag';

function FilterTags({ activeFilters, clearFilterValue, makeSubmit }) {
  return (
    <div className="tags">
      {activeFilters.map(item => (
        <Tag
          title={item.title}
          onClose={() => {
            clearFilterValue(item.filter);
            makeSubmit();
          }}
          key={item.title}
        />
      ))}
    </div>
  );
}

FilterTags.propTypes = {
  activeFilters: PropTypes.array.isRequired,
  clearFilterValue: PropTypes.func.isRequired,
  makeSubmit: PropTypes.func.isRequired,
};

export default FilterTags;
