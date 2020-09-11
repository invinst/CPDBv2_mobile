import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import Attachments from '../attachments';
import styles from './lawsuit.sass';


export default function Lawsuit(props) {
  const { item, changeOfficerTab, pathname, onTrackingAttachment } = props;
  return (
    <Link className={ cx(styles.lawsuitRow) } to={ `/lawsuit/${item.caseNo}/` }>
      <span className='item-content lawsuit-item-content'>
        <div className='item-wrapper-kind'>
          <span className='item-kind lawsuit-item-kind' />
        </div>
        <span className='lawsuit-detail'>
          <div
            className='item-category lawsuit-item-title'>
            { item.primaryCause }
          </div>
          <div className='lawsuit-item-subtitle'>{ item.caseNo }</div>
        </span>
        <span className='lawsuit-right'>
          <Attachments
            attachments={ item.attachments }
            changeOfficerTab={ changeOfficerTab }
            pathname={ pathname }
            onTrackingAttachment={ onTrackingAttachment }
          />
          <span className='item-date lawsuit-item-date'>{ item.date }</span>
        </span>
      </span>
    </Link>
  );
}

Lawsuit.propTypes = {
  item: PropTypes.object,
  changeOfficerTab: PropTypes.func,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
};
