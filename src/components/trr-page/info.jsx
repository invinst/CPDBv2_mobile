import React, { Component, PropTypes } from 'react';

import style from './info.sass';
import TypeOfForce from 'components/trr-page/type-of-force';
import Attachment from 'components/trr-page/attachment';
import Location from 'components/trr-page/location';


class Info extends Component {
  render() {
    const { victimDemographic, forceTypes, incidentDate, address, locationType, beat, point } = this.props;

    return (
      <div className={ style.info }>
        <div className='victim-section'>
          <div className='title'>Victim</div>
          <div className='value'>{ victimDemographic }</div>
        </div>
        <TypeOfForce forceTypes={ forceTypes }/>
        <Attachment/>
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
};

export default Info;
