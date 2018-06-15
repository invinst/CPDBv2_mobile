import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import navigationArrow from 'img/disclosure-indicator.svg';
import style from 'styles/TRRPage/Officer.sass';


class Officer extends Component {
  render() {
    const {
      officerId, fullName, demographic, careerDuration,
      unitName, unitDescription,
      assignedBeat, onDuty, inUniform
    } = this.props;

    return (
      <div className={ style.trrOfficer }>
        <Link
          className='officer-row'
          to={ `/officer/${officerId}/` }
        >
          <img className='officer-visual-token' src='https://via.placeholder.com/38x38'/>
          <div className='officer-profile'>
            <div className='rank'>Officer</div>
            <div className='full-name'>{ fullName }</div>
          </div>
          <img className='navigation-arrow' src={ navigationArrow }/>
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
          <img className='navigation-arrow' src={ navigationArrow }/>
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
};

export default Officer;
