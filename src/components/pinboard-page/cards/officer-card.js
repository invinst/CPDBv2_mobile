import PropTypes from 'prop-types';
import React, { Component } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';
import { get } from 'lodash';

import ItemUnpinButton from '../item-unpin-button';
import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';
import styles from 'components/pinboard-page/cards/cr-card.sass';
import withUndoCard from './with-undo-card';


export default class OfficerCard extends Component {
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
    const { item } = this.props;
    return (
      <BaseOfficerCard
        setRef={ el => this.el = el }
        hasHrefLink={ true }
        customStyle={ styles.wrapper }
        officerId={ item.officerId }
        fullName={ item.fullName }
        rank={ item.rank }
        percentile={ item.percentile }
        topContent={
          <ItemUnpinButton onClick={ this.removeItem } />
        }
        bottomContent={
          <div className={ cx(style.officerComplaintsCount, 'test--officer-cr-count') }>
            { `${item['complaintCount']} ${pluralize('complaint', item['complaintCount'])}` }
          </div>
        }
      />
    );
  }
}

OfficerCard.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
};

export const OfficerCardWithUndo = withUndoCard(
  OfficerCard,
  props => `${get(props, 'item.fullName', '')} removed.`,
  'removeItemInPinboardPage'
);
