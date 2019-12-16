import React, { Component, PropTypes } from 'react';

import withUndoCard from './with-undo-card';
import LocationCard from './location-card.js';


export default class CRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='incidentDate' url={ `/complaint/${this.props.item.id}/` }/>
    );
  }
}

CRCard.propTypes = {
  item: PropTypes.object,
};

export const CRCardWithUndo = withUndoCard(
  CRCard,
  () => 'CR removed.',
  'removeItemInPinboardPage'
);
