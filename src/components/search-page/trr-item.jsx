import React, { PropTypes } from 'react';
import cx from 'classnames';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const TrrItem = ({ item, saveToRecent, addOrRemoveItemInPinboard, query }) => {
  return (
    <SearchItem
      url={ item.url }
      hasPinButton={ true }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      id={ item.id }
      query={ query }
      itemRank={ item.itemRank }
      isPinned={ item.isPinned }
      type={ item.type }
      recentItemData={ item.recentItemData }
      saveToRecent={ saveToRecent }>
      <div className={ cx(searchItemStyle.itemInfo, 'inline') }>
        <div className='item-title'>TRR</div>
        <div className='item-subtitle'>{ item.id }</div>
      </div>
    </SearchItem>
  );
};

TrrItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
    itemRank: PropTypes.number,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  query: PropTypes.string,
};

TrrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default TrrItem;
