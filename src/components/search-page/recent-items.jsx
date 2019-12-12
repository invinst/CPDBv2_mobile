import React, { PropTypes } from 'react';

import OfficerItem from './officer-item';
import CrItem from './cr-item';
import TrrItem from './trr-item';
import style from './recent-items.sass';


const RecentItems = ({ items, addOrRemoveItemInPinboard }) => {
  const itemMapping = {
    'OFFICER': OfficerItem,
    'CR': CrItem,
    'TRR': TrrItem,
  };

  return (
    <div className={ style.recentItems }>
      {
        items.map((item) => {
          const ItemComponent = itemMapping[item.type];
          return (
            ItemComponent && <ItemComponent
              key={ item.id }
              item={ item }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            />
          );
        })
      }
    </div>
  );
};

RecentItems.propTypes = {
  items: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};

RecentItems.defaultProps = {
  items: [],
};

export default RecentItems;
