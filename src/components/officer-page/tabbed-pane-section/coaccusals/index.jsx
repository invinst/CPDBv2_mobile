import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import OfficerCard from './officer-card';
import style from './coaccusals.sass';


export default function Coaccusals(props) {
  const { coaccusalGroups, addOrRemoveItemInPinboard } = props;
  return (
    <div className={ cx(style.officerCoaccusals, 'test--officer-coaccusals') }>
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
                    customStyle={ style.inlineOfficerCard }
                    addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
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

Coaccusals.propTypes = {
  coaccusalGroups: PropTypes.array,
  addOrRemoveItemInPinboard: PropTypes.func,
};
