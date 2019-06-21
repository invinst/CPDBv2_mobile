import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import { mapStyle } from 'components/common/complaint-card.style';
import ItemUnpinButton from '../item-unpin-button';
import styles from './cr-card.sass';
import { startAnimation } from 'utils/animation';
import withUndoCard from './with-undo-card';


export default class CRCard extends Component {
  componentDidMount() {
    const { isAdded } = this.props;
    if (isAdded) {
      startAnimation(() => this.el.classList.add('fade-in'));
    }
  }

  render() {
    const { removeItemInPinboardPage, item, isAdded } = this.props;
    const { incidentDate, point, category } = item;

    const cardMapConfig = {
      lat: get(point, 'lat', null),
      lon: get(point, 'lon', null),
      width: 148,
      height: 88,
    };

    return (
      <div className={ cx(styles.wrapper, { hide: isAdded }) } ref={ el => this.el = el }>
        <ItemUnpinButton
          item={ item }
          removeItemInPinboardPage={ removeItemInPinboardPage } />
        {
        (point === null) ?
          <div className='cr-card-map empty-map' />
          :
          <div
            className='cr-card-map'
            style={ mapStyle(
              cardMapConfig['lat'],
              cardMapConfig['lon'],
              cardMapConfig['width'],
              cardMapConfig['height']) } />
        }
        <div className='cr-card-body'>
          <span className='cr-incident-date'>{ incidentDate }</span>
          <span className='cr-category'>{ category }</span>
        </div>
      </div>
    );
  }
}

CRCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
  isAdded: PropTypes.bool,
};

CRCard.defaultProps = {
  isAdded: false,
};


export const CRCardWithUndo = withUndoCard(
  CRCard,
  () => 'CR removed.'
);
