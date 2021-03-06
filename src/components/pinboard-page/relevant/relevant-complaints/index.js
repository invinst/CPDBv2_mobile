import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { RelevantComplaintCardWithUndo as RelevantComplaintCard } from './relevant-complaint-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantComplaints extends Component {
  loadMore = () => {
    const { pinboardId, nextParams, fetchPinboardRelevantComplaints } = this.props;
    fetchPinboardRelevantComplaints(pinboardId, nextParams);
  };

  render() {
    const { complaints, hasMore, addItemInPinboardPage, requesting } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='COMPLAINTS'
        hasMore={ hasMore }
        loadMore={ this.loadMore }
        className='relevant-complaints'
        requesting={ requesting }
      >
        {
          complaints.map(complaint => (
            <RelevantComplaintCard
              key={ complaint.crid }
              { ...complaint }
              addItemInPinboardPage={ addItemInPinboardPage }
            />
          ))
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
  requesting: PropTypes.bool,
};

RelevantComplaints.defaultProps = {
  complaints: [],
};
