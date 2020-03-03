import React from 'react';
import PropTypes from 'prop-types';


export default function NotMatchedOfficerPage(props) {
  const id = props.id;

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

NotMatchedOfficerPage.propTypes = {
  id: PropTypes.number,
};
