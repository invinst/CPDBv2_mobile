import React, { PropTypes } from 'react';
import style from 'styles/OfficerPage/OfficerTimeline/YearlyStats.sass';

const YearlyStats = ({ year, crCount, trrCount, salary }) => {
  if (trrCount === undefined) {
    trrCount = 'Unknown';
  }
  if (salary === undefined) {
    salary = 'Unknown';
  }

  return (
    <div className={ style.yearlyStats }>
      <h2 className={ style.year }>{ year }</h2>
      <div className={ style.row }>
        <span className={ style.label }>CRs</span>
        <span className={ style.value }>{ crCount }</span>
      </div>
      <div className={ style.row }>
        <span className={ style.label }>TRRs</span>
        <span className={ style.value }>{ trrCount }</span>
      </div>
      <div className={ style.row }>
        <span className={ style.label }>Salary</span>
        <span className={ style.value }>{ salary }</span>
      </div>
    </div>
  );
};

YearlyStats.propTypes = {
  year: PropTypes.number,
  crCount: PropTypes.number,
  trrCount: PropTypes.number,
  salary: PropTypes.string
};

export default YearlyStats;
