import React from 'react';
import Tag from '../Tag';

function FilterTags({ activeFilters }) {
  return (
    <div className="tags">
      {activeFilters.map(item => (
        <Tag title={item} onClose="cerramos" key={item} />
      ))}
    </div>
  );
}

export default FilterTags;
