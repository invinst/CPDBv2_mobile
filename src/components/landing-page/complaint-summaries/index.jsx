import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

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
    const { complaintSummaries, description, title } = this.props;

    return (
      <CarouselWrapper title={ title } description={ description }>
        {
          complaintSummaries.map(allegation => (
            <ComplaintSummaryCard allegation={ allegation } key={ allegation.crid } />
          ))
        }
      </CarouselWrapper>
    );
  }
}

ComplaintSummaries.defaultProps = {
  requestComplaintSummaries: () => {},
  complaintSummaries: []
};

ComplaintSummaries.propTypes = {
  complaintSummaries: PropTypes.array,
  requestComplaintSummaries: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object
};
