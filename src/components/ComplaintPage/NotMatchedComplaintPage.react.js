import React from 'react';
import SearchablePage from 'components/Shared/SearchablePage.react';


const NotMatchedComplaintPage = React.createClass({
  propTypes: {
    crid: React.PropTypes.string
  },

  render() {
    const crid = this.props.crid;

    return (
      <SearchablePage>
        <div className='not-matched-complaint-page container content'>
          <h3 className='message-title'>
            Invalid page!
          </h3>
          <div className='message-content'>
            The CRID <span className='crid-number'>{ crid }</span> is not recorded in our database. Please use
            search bar for new search session.
          </div>
        </div>
      </SearchablePage>
    );
  }
});

export default NotMatchedComplaintPage;
