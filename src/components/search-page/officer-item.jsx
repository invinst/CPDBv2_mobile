import React from 'react';
import PropTypes from 'prop-types';

import SearchItemContainer from 'containers/search-page/search-item-container';
import searchItemStyle from './search-item.sass';


const OfficerItem = ({ item, query }) => {
  const extraInfo = {
    fullName: item.name,
  };
  return (
    <SearchItemContainer
      url={ item.url }
      hasPinButton={ true }
      showIntroduction={ item.showIntroduction }
      id={ item.id }
      query={ query }
      itemRank={ item.itemRank }
      isPinned={ item.isPinned }
      type={ item.type }
      recentItemData={ item.recentItemData }
      extraInfo={ extraInfo }
    >
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.name }</div>
        <div className='item-subtitle'>{ item.badge }</div>
      </div>
    </SearchItemContainer>
  );
};

OfficerItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    badge: PropTypes.string,
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

OfficerItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default OfficerItem;
