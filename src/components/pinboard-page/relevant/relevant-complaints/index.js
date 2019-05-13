import React, { Component, PropTypes } from 'react';

import RelevantComplaintCard from './relevant-complaint-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantComplaints extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantComplaints } = this.props;
    fetchPinboardRelevantComplaints(pinboardId, nextParams);
  }

  render() {
    const { complaints, hasMore, addItemInPinboardPage } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='COMPLAINTS'
        hasMore={ hasMore }
        loadMore={ this.loadMore.bind(this) }
        className='relevant-complaints'
      >
        {
          complaints.map((complaint, index) =>
            <RelevantComplaintCard key={ index } { ...complaint } addItemInPinboardPage={ addItemInPinboardPage }/>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantComplaints.propTypes = {
  complaints: PropTypes.arrayOf(PropTypes.object),
  nextParams: PropTypes.object,
  fetchPinboardRelevantComplaints: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
  addItemInPinboardPage: PropTypes.func,
};

RelevantComplaints.defaultProps = {
  complaints: []
};
