import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './officer.sass';
import RadarChart from 'components/common/radar-chart';
import { officerUrl } from 'utils/url-util';


class Officer extends Component {
  render() {
    const {
      officerId, fullName, demographic, careerDuration,
      unitName, unitDescription,
      assignedBeat, onDuty, inUniform, percentile,
    } = this.props;

    const visualTokenConfig = percentile ? {
      backgroundColor: percentile && percentile.visualTokenBackground,
      data: percentile && percentile.items,
    } : {};

    return (
      <div className={ style.trrOfficer }>
        <Link
          className='officer-row'
          to={ officerUrl(officerId, fullName) }
        >
          <div className='officer-visual-token'>
            <RadarChart { ...visualTokenConfig }/>
          </div>
          <div className='officer-profile'>
            <div className='rank'>Officer</div>
            <div className='full-name'>{ fullName }</div>
          </div>
          <img className='navigation-arrow' src='/img/disclosure-indicator.svg'/>
        </Link>
        <div className='row'>
          <div className='title'>{ demographic }</div>
        </div>
        <div className='row'>
          <div className='title'>Career</div>
          <div className='value'>{ careerDuration }</div>
        </div>
        <div className='row'>
          <div className='title'>Unit</div>
          <div className='value'>{ unitDescription || unitName }</div>
          <img className='navigation-arrow' src='/img/disclosure-indicator.svg'/>
        </div>
        <div className='row'>
          <div className='title'>Assigned Beat</div>
          <div className='value'>{ assignedBeat }</div>
        </div>
        <div className='row'>
          <div className='title'>On Duty</div>
          <div className='value'>{ onDuty }</div>
        </div>
        <div className='row'>
          <div className='title'>In Uniform</div>
          <div className='value'>{ inUniform }</div>
        </div>
      </div>
    );
  }
}


Officer.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  demographic: PropTypes.string,
  careerDuration: PropTypes.string,
  unitName: PropTypes.string,
  unitDescription: PropTypes.string,
  assignedBeat: PropTypes.string,
  onDuty: PropTypes.string,
  inUniform: PropTypes.string,
  percentile: PropTypes.object,
};

export default Officer;
