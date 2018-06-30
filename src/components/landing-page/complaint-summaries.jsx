import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import CMSContent from './cms-content';
import HorizontalScrolling from './horizontal-scrolling';
import ComplaintSummaryCard from './complaint-summary-card';
import style from './complaint-summaries.sass';


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
      <div className={ style.complaintSummaries }>
        <div className='carousel-title'><CMSContent field={ title } /></div>
        <HorizontalScrolling>
          <div className='carousel-description'>
            <CMSContent field={ description } />
          </div>
          {
            complaintSummaries.map(allegation => (
              <ComplaintSummaryCard allegation={ allegation } key={ allegation.crid } />
            ))
          }
        </HorizontalScrolling>
      </div>
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
