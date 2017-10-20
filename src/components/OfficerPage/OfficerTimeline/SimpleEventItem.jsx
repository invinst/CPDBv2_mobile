import React, { PropTypes } from 'react';
import style from 'styles/OfficerPage/OfficerTimeline/SimpleEventItem.sass';

const SimpleEventItem = ({ title, date, content, isLast }) => (
  <div className={ style.simpleEventItem }>
    <div className={ style.title }>{ title }</div>
    <div className={ style.date }> { date } </div>
    { content ? <div className={ style.content }>{ content }</div> : null }
  </div>
);

SimpleEventItem.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  isLast: PropTypes.bool
};

export default SimpleEventItem;
