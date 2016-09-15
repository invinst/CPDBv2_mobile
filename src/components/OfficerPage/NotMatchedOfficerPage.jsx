import React from 'react';
import SearchablePage from 'components/Shared/SearchablePage';


const NotMatchedOfficerPage = React.createClass({
  propTypes: {
    id: React.PropTypes.number
  },

  render() {
    const id = this.props.id;

    return (
      <SearchablePage>
        <div className='not-matched-officer-page container content'>
          <h3 className='message-title'>
            Sorry!
          </h3>
          <div className='message-content'>
            <span className='officer-id'>{ id }</span> is not in our database.
          </div>
        </div>
      </SearchablePage>
    );
  }
});

export default NotMatchedOfficerPage;
