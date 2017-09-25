import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading';
import ExpandibleCard from '../ExpandibleCard';
import ExpandibleUnivCard from '../ExpandibleUnivCard';
import { CAREER } from '../../constants/strings';

function SearchResult(props) {
  if (props.requesting) return <Loading />;
  return (
    <InfiniteScroll
      pageStart={0}
      loader={<Loading />}
      next={() => props.handleInfinite()}
      hasMore={props.hasMore}
    >
      <div className="search-feedback">{props.feedback}</div>
      {props.data.map((res) => {
        if (props.active === CAREER) {
          return <ExpandibleCard career={res} key={res.id} mobile={props.mobile} guest={props.guest} goalClick={props.goalClick} />;
        }
        return <ExpandibleUnivCard university={res} key={res.id} mobile={props.mobile} guest={props.guest} />;
      })}
    </InfiniteScroll>
  );
}

SearchResult.defaultProps = {
  mobile: false,
};

SearchResult.propTypes = {
  mobile: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  handleInfinite: PropTypes.func.isRequired,
  feedback: PropTypes.string.isRequired,
};


export default SearchResult;
