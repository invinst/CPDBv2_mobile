import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
// import Attachments from './attachments';
import styles from './cr.sass';


export default class Cr extends Component {
  render() {
    const { item, hasBorderBottom, officerId, openComplaintPage } = this.props;

    return (
      <div
        className={ cx(styles.wrapper, 'test--cr-item') }
        onClick={ () => openComplaintPage({ crid: item.crid, officerId: officerId }) }
      >
        <div className='content'>
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
      </div>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  officerId: PropTypes.number,
  openComplaintPage: PropTypes.func,
};
