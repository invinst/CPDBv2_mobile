import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import RadarChart from 'components/common/radar-chart';
import style from './officer-item.sass';


const OfficerItem = ({ name, badge, url, percentile, saveToRecent }) => {
  const handleClick = (name, url) => saveToRecent({
    type: 'Officer',
    title: name,
    url: url
  });

  return (
    <Link
      to={ url }
      className={ style.officerItem }
      onClick={ () => handleClick(name, url) }>
      <div className='radar-chart-wrapper'>
        <RadarChart
          radius={ 150 }
          backgroundColor={ percentile && percentile.visualTokenBackground }
          data={ percentile && percentile.items }
       />
      </div>
      <div className='officer-info'>
        <div className='officer-name'>{ name }</div>
        <div className='officer-badge'>{ badge }</div>
      </div>
    </Link>
  );
};

OfficerItem.propTypes = {
  name: PropTypes.string,
  badge: PropTypes.string,
  url: PropTypes.string,
  percentile: PropTypes.object,
  saveToRecent: PropTypes.func
};

OfficerItem.defaultProps = {
  percentile: {},
  saveToRecent: () => {}
};

export default OfficerItem;
