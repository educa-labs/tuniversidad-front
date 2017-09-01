import React from 'react';
import Tag from '../Tag';

function FilterTags() {
  return (
    <div className="tags">
      <Tag title="Hola" onClose={() => console.log('Cerramos')} />
      <Tag title="Chao" onClose={() => console.log('Cerramos')} />
    </div>
  );
}

export default FilterTags;
