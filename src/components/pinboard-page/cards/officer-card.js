import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';

import ItemUnpinButton from '../item-unpin-button';
import BaseOfficerCard from 'components/common/base-officer-card';
import style from './officer-card.sass';
import { startAnimation } from 'utils/animation';
import styles from 'components/pinboard-page/cards/cr-card.sass';


export default class OfficerCard extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { isAdded } = this.props;
    if (isAdded) {
      startAnimation(() => findDOMNode(this.el).classList.add('fade-in'));
    }
  }

  handleClick() {
    findDOMNode(this.el).classList.add('fade-out');
  }

  render() {
    const { item, removeItemInPinboardPage, isAdded } = this.props;
    return (
      <BaseOfficerCard
        setRef={ el => this.el = el }
        hasHrefLink={ false }
        customStyle={ cx(styles.wrapper, { hide: isAdded }) }
        officerId={ item.officerId }
        fullName={ item.fullName }
        rank={ item.rank }
        percentile={ item.percentile }
        topContent={
          <ItemUnpinButton
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage }
            onClick={ this.handleClick } />
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
  isAdded: PropTypes.bool,
};

OfficerCard.defaultProps = {
  isAdded: false,
};
