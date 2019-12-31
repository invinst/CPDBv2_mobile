import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const OfficerItem = ({ item, saveToRecent, addOrRemoveItemInPinboard, query }) => {
  const extraInfo = {
    fullName: item.name,
    complaintCount: item.complaintCount,
    sustainedCount: item.sustainedCount,
    age: item.age,
    race: item.race,
    gender: item.gender,
    rank: item.rank,
  };
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
      saveToRecent={ saveToRecent }
      extraInfo={ extraInfo }
    >
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.name }</div>
        <div className='item-subtitle'>{ item.badge }</div>
      </div>
    </SearchItem>
  );
};

OfficerItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    complaintCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    age: PropTypes.string,
    race: PropTypes.string,
    gender: PropTypes.string,
    rank: PropTypes.string,
    badge: PropTypes.string,
    url: PropTypes.string,
    itemRank: PropTypes.number,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  query: PropTypes.string,
};

OfficerItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default OfficerItem;
