import React, { Component, PropTypes } from 'react';

import withUndoCard from './with-undo-card';
import LocationCard from './location-card.js';


export default class TRRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='trrDate' url={ `/trr/${this.props.item.id}/` }/>
    );
  }
}

TRRCard.propTypes = {
  item: PropTypes.object,
};

export const TRRCardWithUndo = withUndoCard(
  TRRCard,
  () => 'TRR removed.',
  'removeItemInPinboardPage'
);

