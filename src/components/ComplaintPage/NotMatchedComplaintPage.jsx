import React from 'react';
import cx from 'classnames';

import SearchablePageContainer from 'containers/Shared/SearchablePageContainer';
import style from 'styles/ComplaintPage/NotMatchedComplaintPage.sass';


const NotMatchedComplaintPage = React.createClass({
  propTypes: {
    crid: React.PropTypes.string
  },

  render() {
    const crid = this.props.crid;

    return (
      <SearchablePageContainer>
        <div className={ cx(style.notMatchedComplaintPage, 'container content') }>
          <h3 className='message-title'>
            Invalid page!
          </h3>
          <div className='message-content'>
            The CRID <span className='crid-number'>{ crid }</span> is not recorded in our database. Please use
            search bar for new search session.
          </div>
        </div>
      </SearchablePageContainer>
    );
  }
});

export default NotMatchedComplaintPage;
