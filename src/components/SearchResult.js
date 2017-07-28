import React, { PropTypes } from 'react';
import is from 'is_js';
import InfiniteScroll from 'react-infinite-scroll-component';
import UniversityCard from './UniversityCard';
import CareerCard from './CareerCard';
import Loading from './Loading';
import ExpandibleCard from './ExpandibleCard';

function SearchResult(props) {
  if (props.requesting) {
    return (
      <div className={`col col-grey${props.mobile ? '' : '-desk'}`}><Loading /></div>
    );
  }

  let beforeSearch = null;
  if (props.active === 'carreer') {
    beforeSearch = props.popularCareers.map(res => {
      if (props.mobile) {
        return <ExpandibleCard career={res} key={res.id} />;
      }
      return <CareerCard career={res} key={res.id} />;
    });
  }
  
  if (props.active === 'university') {
    beforeSearch = props.popularUniv.map(res => (
      <UniversityCard university={res} key={res.id} mobile={props.mobile} />
    ));
  }
  if (props.data === null) {
    return (
      <div className="before-search">
        <div className={`popular-msg${props.mobile ? '-mobile' : ''}`}>{props.active === 'university' ? 'Universidades' : 'Carreras'} más buscadas</div>
        {beforeSearch}
      </div>
    );
  }
  let afterSearch = null;
  if (is.empty(props.data)) {
    afterSearch = <div>No hay resultados</div>;
  } else {
    if (props.active === 'university') {
      afterSearch = props.dataTypeHasChanged ? beforeSearch : props.data.map(res => (
        <UniversityCard university={res} key={res.id} mobile={props.mobile} />
      ));
    }
    if (props.active === 'carreer') {
      afterSearch = props.dataTypeHasChanged ? beforeSearch : props.data.map(res => {
        if (props.mobile) {
          return <ExpandibleCard career={res} key={res.id} mobile={props.mobile} compress />;
        }
        return <CareerCard career={res} key={res.id} mobile={props.mobile} />;
      });
    }
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loader={<Loading />}
      next={() => props.handleInfinite()}
      hasMore={props.hasMore}
    >
      <div className={`popular-msg${props.mobile ? '-mobile' : ''}`}>Resultados de la búsqueda</div>
      {afterSearch}
    </InfiniteScroll>
  );
}

SearchResult.propTypes = {
  active: PropTypes.string.isRequired,
  mobile: PropTypes.bool.isRequired,
  dataTypeHasChanged: PropTypes.bool.isRequired,
  requesting: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleInfinite: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default SearchResult;
