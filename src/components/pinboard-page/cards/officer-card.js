import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';

import ItemUnpinButton from '../item-unpin-button';
import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';


export default class OfficerCard extends Component {
  render() {
    const { item, removeItemInPinboardPage } = this.props;
    return (
      <BaseOfficerCard
        hasHrefLink={ false }
        customStyle={ style.wrapper }
        officerId={ item.officerId }
        fullName={ item.fullName }
        rank={ item.rank }
        percentile={ item.percentile }
        topContent={
          <ItemUnpinButton
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage } />
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
