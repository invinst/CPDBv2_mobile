import React, { Component, PropTypes } from 'react';

import RelevantCoaccusalCard from './relevant-coaccusal-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantCoaccusals extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantCoaccusals } = this.props;
    fetchPinboardRelevantCoaccusals(pinboardId, nextParams);
  }

  render() {
    const { coaccusals, hasMore, addItemToPinboard } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='COACCUSALS'
        hasMore={ hasMore }
        loadMore={ this.loadMore.bind(this) }
        className='relevant-coaccusals'
      >
        {
          coaccusals.map(coaccusal =>
            <RelevantCoaccusalCard key={ coaccusal.id } { ...coaccusal } addItemToPinboard={ addItemToPinboard }/>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantCoaccusals.propTypes = {
  coaccusals: PropTypes.arrayOf(PropTypes.object),
  nextParams: PropTypes.object,
  fetchPinboardRelevantCoaccusals: PropTypes.func,
  addItemToPinboard: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
};

RelevantCoaccusals.defaultProps = {
  coaccusals: []
};
