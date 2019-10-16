import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const OfficerItem = ({ item, saveToRecent, addOrRemoveItemInPinboard }) => {
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
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.name }</div>
        <div className='item-subtitle'>{ item.badge }</div>
      </div>
    </SearchItem>
  );
};

OfficerItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    badge: PropTypes.string,
    url: PropTypes.string,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
};

OfficerItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default OfficerItem;
