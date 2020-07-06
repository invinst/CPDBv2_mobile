import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { CAROUSEL_TYPES } from 'constants';
import CarouselWrapper from '../carousel-wrapper';
import ComplaintSummaryCard from './complaint-summary-card';


export default class ComplaintSummaries extends Component {

  componentDidMount() {
    const { complaintSummaries, requestComplaintSummaries } = this.props;

    if (isEmpty(complaintSummaries)) {
      requestComplaintSummaries();
    }
  }

  render() {
    const { complaintSummaries, description, title, addOrRemoveItemInPinboard } = this.props;

    return (
      <CarouselWrapper
        title={ title }
        description={ description }
        trackingContentType={ CAROUSEL_TYPES.COMPLAINT }
      >
        {
          complaintSummaries.map(allegation => (
            <ComplaintSummaryCard
              allegation={ allegation }
              key={ allegation.crid }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          ))
        }
      </CarouselWrapper>
    );
  }
}

ComplaintSummaries.defaultProps = {
  requestComplaintSummaries: () => {},
  addOrRemoveItemInPinboard: () => {},
  complaintSummaries: [],
};

ComplaintSummaries.propTypes = {
  complaintSummaries: PropTypes.array,
  requestComplaintSummaries: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object,
};
