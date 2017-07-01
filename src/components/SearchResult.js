import React, { PropTypes } from 'react';
import is from 'is_js';
import Infinite from 'react-infinite';
import UniversityCard from './UniversityCard';
import CareerCard from './CareerCard';
import Loading from './Loading';

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
  console.log('Estamos', props.data);
  let afterSearch = null;
  if (is.empty(props.data)) {
    console.log('Hola');
    afterSearch = <div>No hay resultados</div>;
  } else {
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
  }

  function handleInfinite() {
    if (!props.infiniteLoading) props.handleInfinite();
  }

  return (
    <div className={`col col-grey${props.mobile ? '' : '-desk padding-2'}`}>
      <Infinite
        elementHeight={props.mobile ? 320 : 250}
        useWindowAsScrollContainer
        loadingSpinnerDelegate={<Loading />}
        infiniteLoadBeginEdgeOffset={20}
        onInfiniteLoad={handleInfinite}
        isInfiniteLoading={props.infiniteLoading}
      >
        {afterSearch}
      </Infinite>
    </div>
  );
}

SearchResult.propTypes = {
  active: PropTypes.string.isRequired,
  mobile: PropTypes.bool.isRequired,
  dataTypeHasChanged: PropTypes.bool.isRequired,
  requesting: PropTypes.bool.isRequired,
  infiniteLoading: PropTypes.bool.isRequired,
  handleInfinite: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default SearchResult;
