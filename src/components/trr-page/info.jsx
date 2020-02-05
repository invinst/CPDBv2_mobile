import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './info.sass';
import TypeOfForce from 'components/trr-page/type-of-force';
import Attachment from 'components/trr-page/attachment';
import Location from 'components/trr-page/location';


class Info extends Component {
  render() {
    const { victimDemographic, forceTypes, incidentDate, address, locationType, beat, point, trrId } = this.props;

    return (
      <div className={ style.trrInfo }>
        <div className='victim-section'>
          <div className='title'>Victim</div>
          <div className='value'>{ victimDemographic }</div>
        </div>
        <TypeOfForce forceTypes={ forceTypes }/>
        <Attachment trrId={ trrId }/>
        <div className='date-title'>DATE OF INCIDENT</div>
        <div className='incident-date'>{ incidentDate }</div>
        <Location address={ address } locationType={ locationType } beat={ beat } point={ point }/>
      </div>
    );
  }
}


Info.propTypes = {
  victimDemographic: PropTypes.string,
  forceTypes: PropTypes.arrayOf(PropTypes.string),
  incidentDate: PropTypes.string,
  address: PropTypes.string,
  locationType: PropTypes.string,
  beat: PropTypes.string,
  point: PropTypes.object,
  trrId: PropTypes.number,
};

export default Info;
