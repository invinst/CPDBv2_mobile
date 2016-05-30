import React from 'react';
import DataTypeUtil from 'utils/DataTypeUtil';


const FailedSearch = React.createClass({
  propTypes: {
    term: React.PropTypes.string
  },

  render() {
    const term = this.props.term || '';
    let textMessage = 'No matches yet.';

    if (!DataTypeUtil.isValidCridQueryFormat(term) && !DataTypeUtil.isNumeric(term)) {
      textMessage = 'Sorry, there\'s no results for your search in the database.';
    }

    return (
      <div className='failed-search pad'>{ textMessage }</div>
    );
  }
});

export default FailedSearch;
