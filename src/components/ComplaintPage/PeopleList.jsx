import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import style from 'styles/ComplaintPage/PeopleList.sass';
import SectionTitle from 'components/ComplaintPage/SectionTitle';

const PeopleList = ({ title, people }) => {

  const rows = people.map(({ content, subcontent, url }, index) => (
    <Link to={ url } className='row' key={ index }>
      <tr>
        <th className='threshold' />
        <th className='content-wrapper'>
          <div className='content'>{ content }</div>
          <div className='subcontent'>{ subcontent }</div>
        </th>
      </tr>
    </Link>
  ));

  return (
    <div className={ style.peopleList }>
      <SectionTitle title={ title } />
      <table>
        { rows }
      </table>
    </div>
  );
};

PeopleList.propTypes = {
  title: PropTypes.string,
  people: PropTypes.array
};

export default PeopleList;
