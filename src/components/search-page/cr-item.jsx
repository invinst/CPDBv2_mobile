import React from 'react';
import PropTypes from 'prop-types';

import SearchItemContainer from 'containers/search-page/search-item-container';
import searchItemStyle from './search-item.sass';


const CrItem = ({ item, query }) => {
  return (
    <SearchItemContainer
      url={ item.url }
      hasPinButton={ true }
      showIntroduction={ item.showIntroduction }
      id={ item.crid }
      itemRank={ item.itemRank }
      query={ query }
      isPinned={ item.isPinned }
      type={ item.type }
      recentItemData={ item.recentItemData }
    >
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.category }</div>
        <div className='item-subtitle'>CRID { item.crid } • { item.incidentDate }</div>
      </div>
    </SearchItemContainer>
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
    showIntroduction: PropTypes.bool,
  }),
  query: PropTypes.string,
  showIntroduction: PropTypes.bool,
};

CrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default CrItem;
