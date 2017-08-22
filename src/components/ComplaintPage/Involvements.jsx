import React, { PropTypes } from 'react';

import constants from 'constants';
import PeopleList from 'components/ComplaintPage/PeopleList';

const Involvements = ({ involvements }) => {
  if (involvements.length === 0) {
    return null;
  }

  const rows = involvements.map((involvement, index) => {

    const people = involvement.officers.map((officer) => ({
      content: officer.abbrName,
      subcontent: officer.extraInfo,
      url: `${constants.OFFICER_PATH}${officer.id}/`
    }));

    return (
      <PeopleList
        title={ involvement.involvedType }
        people={ people }
        key={ index }
      />
    );
  });

  return (
    <div>
      { rows }
    </div>
  );
};

Involvements.propTypes = {
  involvements: PropTypes.array
};

export default Involvements;
