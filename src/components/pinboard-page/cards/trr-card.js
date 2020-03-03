import PropTypes from 'prop-types';
import React from 'react';

import withUndoCard from './with-undo-card';
import LocationCard from './location-card.js';


export default function TRRCard(props) {
  return <LocationCard { ...props } dateKey='trrDate' url={ `/trr/${props.item.id}/` }/>;
}

TRRCard.propTypes = {
  item: PropTypes.object,
};

export const TRRCardWithUndo = withUndoCard(
  TRRCard,
  () => 'TRR removed.',
  'removeItemInPinboardPage'
);

