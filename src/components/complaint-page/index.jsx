import React, { Component, PropTypes } from 'react';
import { StickyContainer } from 'react-sticky';

import constants from 'constants';
import NavbarContainer from 'containers/navbar-container';
import BottomPadding from 'components/shared/bottom-padding';
import AccusedOfficers from './accused-officers';
import ComplaintCategory from './complaint-category';
import style from './complaint-page.sass';


export default class ComplaintPage extends Component {
  componentDidMount() {
    const { complaint, requestComplaint, complaintId } = this.props;
    if (!complaint) {
      requestComplaint(complaintId);
    }
  }

  render() {
    const { complaint } = this.props;

    if (!complaint) {
      return null;
    }

    return (
      <StickyContainer className={ style.complaintPage }>
        <NavbarContainer backLink={ constants.SEARCH_PATH } />
        <div className='complaint-page-body'>
          <ComplaintCategory
            category={ complaint.category }
            subcategory={ complaint.subcategory }
          />
          <AccusedOfficers officers={ complaint.coaccused } />
        </div>
        <BottomPadding />
      </StickyContainer>
    );
  }
}

ComplaintPage.propTypes = {
  requestComplaint: PropTypes.func,
  complaintId: PropTypes.string,
  complaint: PropTypes.object
};

ComplaintPage.defaultProps = {
  requestComplaint: () => {}
};