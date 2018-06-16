import React, { PropTypes } from 'react';
import SectionTitle from 'components/ComplaintPage/SectionTitle';
import ComplaintFinding from 'components/shared/complaint-finding';

import style from 'styles/ComplaintPage/Outcome.sass';

const Outcome = ({ finalFinding, recommended, finalOutcome }) => {
  const rowsData = [
    ['Final Finding', <ComplaintFinding finding={ finalFinding } key='final-finding' />],
    ['Recommended', recommended],
    ['Final', finalOutcome]
  ];

  const rows = rowsData.map(([title, value], index) => (
    <div className='row' key={ index }>
      <span className='title'>{ title }</span>
      <span className='value'>{ value }</span>
    </div>
  ));

  return (
    <div className={ style.outcome }>
      <SectionTitle title='Outcome' />
      { rows }
    </div>
  );
};

Outcome.propTypes = {
  finalFinding: PropTypes.string,
  recommended: PropTypes.string,
  finalOutcome: PropTypes.string
};

export default Outcome;
