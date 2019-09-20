import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import Attachments from './attachments';
import styles from './cr.sass';


export default class Cr extends Component {
  render() {
    const { item, className, pathname, onTrackingAttachment } = this.props;

    return (
      <Link
        className={ cx(styles.wrapper, className) }
        to={ `/complaint/${item.crid}/` }
      >
        <div className='content'>
          <span className={ cx('kind', { 'sustained': item.finding === 'Sustained' }) }>C</span>
          <span className='detail'>
            <div className='category'>{ item.category }</div>
            <div className='finding'>{ item.finding }, { item.outcome }</div>
          </span>
          <span className='right'>
            <Attachments
              attachments={ item.attachments }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
            />
            <span className='date'>{ item.date }</span>
          </span>
        </div>
      </Link>
    );
  }
}

Cr.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};
