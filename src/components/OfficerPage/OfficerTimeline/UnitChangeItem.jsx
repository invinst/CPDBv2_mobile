import React, { PropTypes } from 'react';
import style from 'styles/OfficerPage/OfficerTimeline/UnitChangeItem.sass';
import dot from 'img/dot.svg';

const UnitChangeItem = ({ date, unitName }) => (
  <div className={ style.unitChangeItem }>
    <div className={ style.title }> Unit Change </div>
    <div className={ style.verticalLine }></div>
    <div className={ style.date }> { date } <img src={ dot } /></div>
    <div className={ style.unitName }> Assigned to Unit { unitName }</div>
  </div>
);

UnitChangeItem.propTypes = {
  date: PropTypes.string,
  unitName: PropTypes.string
};

export default UnitChangeItem;
