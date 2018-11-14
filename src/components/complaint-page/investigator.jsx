import React, { PropTypes } from 'react';


import { officerUrl } from 'utils/url-util';
import RadarChart from 'components/common/radar-chart';
import SafeLink from './safe-link';
import style from './investigator.sass';


const Investigator = ({ investigators=[] }) => {
  if (investigators.length === 0) {
    return null;
  }

  return (
    <div className={ style.investigator }>
      <div className='header'>INVESTIGATOR</div>
      {
        investigators.map((investigator, idx) => {
          return (
            <SafeLink
              key={ idx }
              to={ officerUrl(investigator['officer_id'], investigator['full_name']) }
              className='investigator-row'
            >
              <div className='visual-token'>
                <RadarChart
                  backgroundColor={ investigator.percentile && investigator.percentile.visualTokenBackground }
                  data={ investigator.percentile && investigator.percentile.items }
                  />
              </div>
              <div className='name'>{ investigator['full_name'] }</div>
              <div className='badge-wrapper'>
                {
                  investigator.badge ? (
                    <span className='badge'>{ investigator.badge }</span>
                  ) : null
                }
              </div>
            </SafeLink>
          );
        })
      }
    </div>
  );
};

Investigator.propTypes = {
  investigators: PropTypes.array
};

export default Investigator;
