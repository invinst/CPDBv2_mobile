import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { get } from 'lodash';

import { mapStyle } from 'components/common/complaint-card.style';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import styles from './location-card.sass';


export default class LocationCard extends Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(e) {
    e.preventDefault();
    const { item, removeItemInPinboardPage } = this.props;
    const { type, id } = item;

    removeItemInPinboardPage({ type, id });
  }

  render() {
    const { item, dateKey, url } = this.props;
    const { point, category } = item;

    const cardMapConfig = {
      lat: get(point, 'lat', null),
      lon: get(point, 'lon', null),
      width: 148,
      height: 88,
    };

    return (
      <Link to={ url } className={ styles.locationCard }>
        <ItemUnpinButton onClick={ this.removeItem }/>
        {
          (point === null) ?
            <div className='location-card-map empty-map' />
            :
            <div
              className='location-card-map'
              style={ mapStyle(
                cardMapConfig['lat'],
                cardMapConfig['lon'],
                cardMapConfig['width'],
                cardMapConfig['height']) } />
        }
        <div className='location-card-body'>
          <span className='location-card-date'>{ item[dateKey] }</span>
          <span className='location-card-category'>{ category }</span>
        </div>
      </Link>
    );
  }
}

LocationCard.propTypes = {
  item: PropTypes.object,
  dateKey: PropTypes.string,
  removeItemInPinboardPage: PropTypes.func,
  url: PropTypes.string,
};

LocationCard.defaultProps = {
  removeItemInPinboardPage: () => {},
};
