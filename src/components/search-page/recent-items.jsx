import React from 'react';
import PropTypes from 'prop-types';

import OfficerItem from './officer-item';
import CrItem from './cr-item';
import TrrItem from './trr-item';
import LawsuitItem from './lawsuit-item';
import style from './recent-items.sass';


const RecentItems = ({ items, query }) => {
  const itemMapping = {
    'OFFICER': OfficerItem,
    'CR': CrItem,
    'TRR': TrrItem,
    'LAWSUIT': LawsuitItem,
  };

  return (
    <div className={ style.recentItems }>
      {
        items.map((item) => {
          const ItemComponent = itemMapping[item.type];
          return (
            ItemComponent && <ItemComponent
              key={ item.id }
              query={ query }
              item={ item }
            />
          );
        })
      }
    </div>
  );
};

RecentItems.propTypes = {
  items: PropTypes.array,
  query: PropTypes.string,
};

RecentItems.defaultProps = {
  items: [],
};

export default RecentItems;
