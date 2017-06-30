import React, { PropTypes } from 'react';
import UniversityCard from './UniversityCard';
import CareerCard from './CareerCard';

function SearchResult(props) {

  if (props.requesting) {
    return (
      <div className={`col col-grey${props.mobile ? '' : '-desk'}`} />
    );
  }

  let beforeSearch = null;
  if (props.active === 'carreer') {
    beforeSearch = props.popularCareers.map(res => (
      <CareerCard career={res} key={res.id} mobile={props.mobile} />
    ));
  }
  if (props.active === 'university') {
    beforeSearch = props.popularUniv.map(res => (
      <UniversityCard university={res} key={res.id} mobile={props.mobile} />
    ));
  }
  if (props.data === null) {
    return (
      <div className={`col col-grey${props.mobile ? '' : '-desk padding-2'}`}>
        <div className="before-search">
          <div className={`popular-msg${props.mobile ? '-mobile' : ''}`}>{props.active === 'university' ? 'Universidades' : 'Carreras'} más buscadas</div>
          {beforeSearch}
          </div>
      </div>
    );
  }

  let afterSearch = null;
  if (props.data === []) {
    afterSearch = <div>No hay resultados</div>;
  }
  if (props.active === 'university') {
    afterSearch = props.dataTypeHasChanged ? beforeSearch : props.data.map(res => (
      <UniversityCard university={res} key={res.id} mobile={props.mobile} />
    ));
  }
  if (props.active === 'carreer') {
    afterSearch = props.dataTypeHasChanged ? beforeSearch : props.data.map(res => (
      <CareerCard career={res} key={res.id} mobile={props.mobile} />
    ));
  }

  return (
    <div className={`col col-grey${props.mobile ? '' : '-desk padding-2'}`}>
      {afterSearch}
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
