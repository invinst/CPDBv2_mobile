import React, { Component, PropTypes } from 'react';

import OfficerCard from './officer-card';
import style from './coaccusals.sass';


export default class Coaccusals extends Component {
  render() {
    const { coaccusalGroups } = this.props;

    return (
      <div className={ style.officerCoaccusals }>
        {
          coaccusalGroups.map((group) => (
            <div key={ group.name } className='coaccusals-group'>
              <div className='coaccusals-group-name'>{ group.name }</div>
              <div className='coaccusals-group-items'>
                {
                  group.coaccusals.map((coaccusal, cardIndex) => (
                    <OfficerCard
                      { ...coaccusal }
                      key={ cardIndex }
                      extraClassName='inline-officer-card'
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

Coaccusals.propTypes = {
  coaccusalGroups: PropTypes.array,
};
