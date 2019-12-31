import React, { PropTypes } from 'react';
import cx from 'classnames';

import BaseOfficerCard from 'components/common/base-officer-card';
import style from './coaccused-card.sass';

const CoaccusedCard = ({ officer, addOrRemoveItemInPinboard }) => {
  const findingOutcomeClassName = cx(
    'text',
    {
      'disciplined': officer.finalFinding === 'Sustained' && officer.disciplined,
      'sustained': officer.finalFinding === 'Sustained' && !officer.disciplined,
      'not-sustained': officer.finalFinding !== 'Sustained',
    }
  );

  return (
    <BaseOfficerCard
      officerId={ officer.id }
      fullName={ officer.fullName }
      complaintCount={ officer.allegationCount }
      sustainedCount={ officer.sustainedCount }
      age={ officer.age }
      gender={ officer.gender }
      race={ officer.race }
      rank={ officer.rank }
      percentile={ officer.percentile }
      customStyle={ style.coaccusedCard }
      isPinned={ officer.isPinned }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      bottomContent={
        <div className={ style.officerCardAccusedInfo }>
          <div className='category'>{ officer.category }</div>
          <div className='finding-outcome'>
            <span className={ findingOutcomeClassName }>{ officer.findingOutcome }</span>
          </div>
        </div>
      }
    />
  );
};

CoaccusedCard.propTypes = {
  officer: PropTypes.object,
  addOrRemoveItemInPinboard: PropTypes.func,
};

CoaccusedCard.defaultProps = {
  officer: {
    percentile: {},
  },
  addOrRemoveItemInPinboard: () => {},
};

export default CoaccusedCard;
