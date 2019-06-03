import React, { Component } from 'react';

import withUndoCard from './with-undo-card';
import LocationCard from './location-card.js';


export default class TRRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='trrDate'/>
    );
  }
}


export const TRRCardWithUndo = withUndoCard(
  TRRCard,
  () => 'TRR removed.',
  'removeItemInPinboardPage'
);
