import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';

import { officerUrl } from 'utils/url-util';
import RadarChart from 'components/common/radar-chart';
import style from './police-witness.sass';


const PoliceWitness = ({ policeWitnesses=[] }) => {
  if (policeWitnesses.length === 0) {
    return null;
  }

  return (
    <div className={ style.policeWitness }>
      <div className='header'>POLICE WITNESSES</div>
      {
        policeWitnesses.map((policeWitness, idx) => (
          <Link
            to={ officerUrl(policeWitness['officer_id'], policeWitness['full_name']) }
            className='police-witness-row'
            key={ idx }
          >
            <div className='visual-token'>
              <RadarChart
                backgroundColor={ policeWitness.percentile && policeWitness.percentile.visualTokenBackground }
                data={ policeWitness.percentile && policeWitness.percentile.items }
              />
            </div>
            <div className='police-witness-info'>
              <div className='name'>{ policeWitness['full_name'] }</div>
              <div className='statistic-count'>
                {
                  `
                    ${policeWitness['allegation_count']} ${pluralize('allegation', policeWitness['allegation_count'])}
                    ${policeWitness['sustained_count']} sustained
                  `
                }
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

PoliceWitness.propTypes = {
  policeWitnesses: PropTypes.array,
};

export default PoliceWitness;
