import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const CrItem = ({ item, saveToRecent, addOrRemoveItemInPinboard, query }) => {
  const extraInfo = {
    category: item.category,
    incidentDate: item.incidentDate,
  };
  return (
    <SearchItem
      url={ item.url }
      hasPinButton={ true }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      id={ item.crid }
      itemRank={ item.itemRank }
      query={ query }
      isPinned={ item.isPinned }
      type={ item.type }
      recentItemData={ item.recentItemData }
      saveToRecent={ saveToRecent }
      extraInfo={ extraInfo }
    >
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.category }</div>
        <div className='item-subtitle'>CRID { item.crid } • { item.incidentDate }</div>
      </div>
    </SearchItem>
  );
};

CrItem.propTypes = {
  item: PropTypes.shape({
    crid: PropTypes.string,
    category: PropTypes.string,
    incidentDate: PropTypes.string,
    url: PropTypes.string,
    itemRank: PropTypes.number,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  query: PropTypes.func,
};

CrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default CrItem;
