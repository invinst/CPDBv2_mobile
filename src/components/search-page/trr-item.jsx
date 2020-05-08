import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SearchItemContainer from 'containers/search-page/search-item-container';
import searchItemStyle from './search-item.sass';


const TrrItem = ({ item, query }) => {
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
    >
      <div className={ cx(searchItemStyle.itemInfo, 'inline') }>
        <div className='item-title'>TRR</div>
        <div className='item-subtitle'>{ item.id }</div>
      </div>
    </SearchItemContainer>
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
    showIntroduction: PropTypes.bool,
  }),
  query: PropTypes.string,
  showIntroduction: PropTypes.bool,
};

TrrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default TrrItem;
