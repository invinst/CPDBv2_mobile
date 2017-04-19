import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Arrow from 'components/Shared/Arrow';
import style from 'styles/ComplaintPage/PeopleList.sass';

const PeopleList = ({ title, people }) => {

  const rows = people.map(({ content, subcontent, url }, index) => (
    <Link to={ url } className='url' key={ index }>
      <span className='content'>{ content }</span>
      <span className='subcontent'>{ subcontent }</span>
      <span className='arrow'><Arrow direction='right' /></span>
    </Link>
  ));

  return (
    <div className={ style.peopleList }>
      <p className='title'>{ title }</p>
      <div>
        { rows }
      </div>
    </div>
  );
};

PeopleList.propTypes = {
  title: PropTypes.string,
  people: PropTypes.array
};

export default PeopleList;
