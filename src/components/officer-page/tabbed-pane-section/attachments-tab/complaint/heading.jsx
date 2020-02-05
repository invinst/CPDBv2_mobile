import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import cx from 'classnames';
import style from './heading.sass';


class Heading extends Component {

  render() {
    const { crid, category, finding, outcome, date } = this.props.complaint;

    return (
      <Link
        to={ `/complaint/${crid}/` }
        className={ style.officerAttachmentsTabComplaintHeading }
      >
        <div className='attachments-box'>
          <div className='kind-wrapper'>
            <span className={ cx('kind', { 'active': finding === 'Sustained' }) }>C</span>
          </div>
          <span className='detail'>
            <div className='category'>{ category }</div>
            <div className='finding'>{ finding }, { outcome }</div>
          </span>
          <span className='date'>{ date }</span>
        </div>
      </Link>
    );
  }
}

Heading.propTypes = {
  complaint: PropTypes.object,
};

export default Heading;
