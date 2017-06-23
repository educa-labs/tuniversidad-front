import React, { PropTypes } from 'react';
import UniversityCard from './UniversityCard';
import CareerCard from './CareerCard';

function SearchResult(props) {
  const beforeSearch = (
    <div className="before-search">
      Recuerda que puedes aplicar filtros a tu búsqueda
    </div>
  );
  if (props.data === null) {
    return (
      <div className={`col padding-2 col-grey${props.mobile ? '' : '-desk'}`}>
        {beforeSearch}
      </div>
    );
  }

  let afterSearch = null;

  if (props.requesting) {
    afterSearch = <div>Cargando ...</div>;
  }
  if (props.data === []) {
    afterSearch = <div>No hay resultados</div>;
  }
  if (props.active === 'university') {
    afterSearch = props.dataTypeHasChanged ? null : props.data.map((res) => {
      return <UniversityCard university={res} key={res.id} mobile={props.mobile} />;
    });
  }
  if (props.active === 'carreer') {
    afterSearch = props.dataTypeHasChanged ? null : props.data.map((res) => {
      return <CareerCard career={res} key={res.id} mobile={props.mobile} />;
    });
  }

  return (
    <div className={`col padding-2 col-grey${props.mobile ? '' : '-desk'}`}>
      {afterSearch || beforeSearch}
    </div>
  );
}

SearchResult.propTypes = {
  active: PropTypes.string.isRequired,
  mobile: PropTypes.bool.isRequired,
  dataTypeHasChanged: PropTypes.bool.isRequired,
  requesting: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

export default SearchResult;
