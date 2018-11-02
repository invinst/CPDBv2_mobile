import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import OfficerCard from './officer-card';
import style from './coaccusals.sass';


export default class Coaccusals extends Component {
  componentDidMount() {
    const { getOfficerCoaccusals, officerId, coaccusalGroups } = this.props;
    if (isEmpty(coaccusalGroups)) {
      getOfficerCoaccusals(officerId);
    }
  }

  render() {
    const { coaccusalGroups } = this.props;

    return (
      <div className={ style.officerCoaccusals }>
        {
          coaccusalGroups.map((group) => (
            <div key={ group.name } className='coaccusals-group'>
              <div className='coaccusals-group-name'>{ group.name }</div>
              <div>
                {
                  group.coaccusals.map((coaccusal, cardIndex) => (
                    <OfficerCard
                      { ...coaccusal }
                      key={ cardIndex }
                      displayInline={ true }
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
  getOfficerCoaccusals: PropTypes.func,
  officerId: PropTypes.number,
};
