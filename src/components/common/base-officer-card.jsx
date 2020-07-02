import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { PINBOARD_PAGE } from 'constants';
import RadarChart from 'components/common/radar-chart';
import ItemPinButton from 'components/common/item-pin-button';
import style from './base-officer-card.sass';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { officerUrl } from 'utils/url-util';


export class BaseOfficerCard extends Component {
  render() {
    const {
      officerId,
      fullName,
      rank,
      percentile,
      openCardInNewPage,
      bottomContent,
      topContent,
      customStyle,
      hasHrefLink,
      setRef,
      isPinned,
      pinnable,
      addOrRemoveItemInPinboard,
    } = this.props;
    return (
      <Link
        to={ hasHrefLink ? officerUrl(officerId, fullName) : null }
        target={ openCardInNewPage ? '_blank' : null }
        className={ cx(style.baseOfficerCard, customStyle, 'test--officer-card') }
        ref={ setRef }
      >
        { topContent || pinnable && (
          <ItemPinButton
            className={ pinButtonStyles.cardPinnedButton }
            addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
            showHint={ false }
            item={ {
              type: PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
              id: officerId,
              isPinned,
              fullName,
            } }
          />
        ) }
        <div className='radar-chart'>
          <RadarChart
            radius={ 170 }
            backgroundColor={ percentile && percentile.visualTokenBackground }
            data={ percentile && percentile.items }
          />
        </div>
        <div className='officer-info'>
          <div className='officer-rank'>{rank}</div>
          <div className='officer-name'>{fullName}</div>
        </div>
        { bottomContent }
      </Link>
    );
  }
}

BaseOfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  rank: PropTypes.string,
  percentile: PropTypes.object,
  openCardInNewPage: PropTypes.bool,
  bottomContent: PropTypes.node,
  topContent: PropTypes.node,
  customStyle: PropTypes.string,
  hasHrefLink: PropTypes.bool,
  setRef: PropTypes.func,
  isPinned: PropTypes.bool,
  pinnable: PropTypes.bool,
  addOrRemoveItemInPinboard: PropTypes.func,
};

BaseOfficerCard.defaultProps = {
  topContent: null,
  hasHrefLink: true,
  pinnable: true,
  openCardInNewPage: false,
};

export default BaseOfficerCard;
