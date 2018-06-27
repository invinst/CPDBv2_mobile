import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

// import Attachments from './attachments';
import styles from './cr.sass';


export default class Cr extends Component {
  render() {
    const { item, hasBorderBottom, officerId } = this.props;

    return (
      <Link
        className={ cx(styles.wrapper, 'test--cr-item') }
        to={ `/complaint/${item.crid}/${officerId}/` }
      >
        <div className={ cx('content', { 'no-border-bottom': !hasBorderBottom }) }>
          <span className='kind'>C</span>
          <span className='detail'>
            <div className='category'>{ item.category }</div>
            <div className='finding'>{ item.finding }, { item.outcome }</div>
          </span>
          <span className='right'>
            { /*<Attachments attachments={ item.attachments } />*/ }
            <span className='date'>{ item.date }</span>
          </span>
        </div>
      </Link>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  officerId: PropTypes.number,
};
