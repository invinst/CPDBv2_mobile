import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SuggestedSearchResult extends Component {

  render() {
    const { item, saveToRecent } = this.props;
    const { url, type, title } = item;
    const onClick = saveToRecent.bind(this, { url, type, title });

    return (
      <Link className='row suggested' to={ url } onClick={ onClick }>
        <span className='suggested-type'>{ type }</span>
        <span className='suggested-title'>{ title }</span>
      </Link>
    );
  }
}

SuggestedSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number
};

export default SuggestedSearchResult;
