import React from 'react';


const NotMatchedOfficerPage = React.createClass({
  propTypes: {
    id: React.PropTypes.number
  },

  render() {
    const id = this.props.id;

    return (
      <div className='not-matched-officer-page container content'>
        <h3 className='message-title'>
          Sorry!
        </h3>
        <div className='message-content'>
          <span className='officer-id'>{ id || 'Officer' }</span> is not in our database.
        </div>
      </div>
    );
  }
});

export default NotMatchedOfficerPage;
