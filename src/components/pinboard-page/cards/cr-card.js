import React, { Component, PropTypes } from 'react';

import withUndoCard from './with-undo-card';
import LocationCard from './location-card.js';


export default function CRCard(props) {
  return <LocationCard { ...props } dateKey='incidentDate' url={ `/complaint/${props.item.id}/` }/>;
}

CRCard.propTypes = {
  item: PropTypes.object,
};

export const CRCardWithUndo = withUndoCard(
  CRCard,
  () => 'CR removed.',
  'removeItemInPinboardPage'
);
