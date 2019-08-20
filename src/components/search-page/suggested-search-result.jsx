import React, { Component, PropTypes } from 'react';

import SearchItem from './search-item';


class SuggestedSearchResult extends Component {
  renderItem(item, index) {
    const { url, type, title } = item;

    return (
      <SearchItem
        key={ index }
        url={ url }
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
  items: PropTypes.array,
  index: PropTypes.number,
};

export default SuggestedSearchResult;
