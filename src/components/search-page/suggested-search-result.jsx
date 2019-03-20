import React, { Component, PropTypes } from 'react';

import SearchItem from './search-item';


class SuggestedSearchResult extends Component {

  renderItem(item, index) {
    const { saveToRecent } = this.props;
    const { url, type, title } = item;
    const onClick = saveToRecent.bind(this, { url, type, title });

    return (
      <SearchItem
        key={ index }
        url={ url }
        onClick={ onClick }
        hasPinButton={ false }
        className={ `row suggested ${type.toLowerCase()}` }>
        <span className='suggested-type'>{ type }</span>
        <span className='suggested-title'>{ title }</span>
      </SearchItem>
    );
  }

  render() {
    const { items } = this.props;
    const links = items.map((item, index) => this.renderItem(item, index));
    return <div>{ links }</div>;
  }
}

SuggestedSearchResult.propTypes = {
  saveToRecent: PropTypes.func,
  items: PropTypes.array,
  index: PropTypes.number
};

export default SuggestedSearchResult;
