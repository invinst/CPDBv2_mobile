import React, { PropTypes } from 'react';
import cx from 'classnames';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const TrrItem = ({ item, saveToRecent, addOrRemoveItemInPinboard }) => {
  return (
    <SearchItem
      url={ item.url }
      hasPinButton={ true }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      id={ item.id }
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
    id: PropTypes.number,
    url: PropTypes.string,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
};

TrrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default TrrItem;
