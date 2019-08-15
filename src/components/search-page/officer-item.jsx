import React, { PropTypes } from 'react';

import SearchItem from './search-item';
import style from './officer-item.sass';


const OfficerItem = ({
  item, name, badge, url, saveToRecent, categoryFilter, addOrRemoveItemInPinboard
}) => {
  const handleClick = (categoryFilter, name, url) => saveToRecent({
    type: categoryFilter,
    title: name,
    url: url
  });

  return (
    <SearchItem
      url={ url }
      onClick={ () => handleClick(categoryFilter, name, url) }
      hasPinButton={ true }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      id={ item.id }
      isPinned={ item.isPinned }
      type={ item.type }>
      <div className={ style.officerInfo }>
        <div className='officer-name'>{ name }</div>
        <div className='officer-badge'>{ badge }</div>
      </div>
    </SearchItem>
  );
};

OfficerItem.propTypes = {
  name: PropTypes.string,
  badge: PropTypes.string,
  url: PropTypes.string,
  saveToRecent: PropTypes.func,
  categoryFilter: PropTypes.string,
  addOrRemoveItemInPinboard: PropTypes.func,
  item: PropTypes.object,
};

OfficerItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default OfficerItem;
