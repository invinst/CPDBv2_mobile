import React from 'react';
import PropTypes from 'prop-types';

import SearchItemContainer from 'containers/search-page/search-item-container';
import searchItemStyle from './search-item.sass';


const LawsuitItem = ({ item, query }) => {
  return (
    <SearchItemContainer
      url={ item.url }
      hasPinButton={ false }
      id={ item.id }
      query={ query }
      itemRank={ item.itemRank }
      isPinned={ false }
      type={ item.type }
      recentItemData={ item.recentItemData }
    >
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.primaryCause }</div>
        <div className='item-subtitle'>{ item.caseNo }{item.incidentDate && ` • ${item.incidentDate}`}</div>
      </div>
    </SearchItemContainer>
  );
};

LawsuitItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    caseNo: PropTypes.string,
    primaryCause: PropTypes.string,
    incidentDate: PropTypes.string,
    url: PropTypes.string,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
    itemRank: PropTypes.number,
  }),
  query: PropTypes.string,
};

LawsuitItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default LawsuitItem;
