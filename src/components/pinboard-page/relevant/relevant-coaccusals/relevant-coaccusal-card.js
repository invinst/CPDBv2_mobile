import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import { kebabCase, get } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './relevant-coaccusal-card.sass';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import withUndoCard from 'components/pinboard-page/cards/with-undo-card';
import { PINBOARD_PAGE } from 'constants';


export default class RelevantCoaccusalCard extends Component {
  handleClick = e => {
    e.preventDefault();

    const {
      id,
      addItemInPinboardPage,
      fullName,
      percentile,
      complaintCount,
      rank,
    } = this.props;
    addItemInPinboardPage({
      type: 'OFFICER',
      id: id.toString(),
      fullName,
      percentile,
      complaintCount,
      rank,
    });
  };

  render() {
    const {
      id,
      fullName,
      percentile,
      rank,
      coaccusalCount,
    } = this.props;
    const officerSlug = kebabCase(fullName);
    const chartData = percentile && percentile.items;

    return (
      <Link
        to={ `/officer/${id}/${officerSlug}/` }
        className={ styles.relevantCoaccusalCard }
      >
        <div className='no-print radar-chart-wrapper'>
          <StaticRadarChart
            data={ chartData }
            width={ 148 }
            height={ 60 }
            radius={ 28 }
            offsetTop={ 2 }
            backgroundColor={ percentile ? percentile.visualTokenBackground : undefined }
          />
        </div>
        <div className='officer-card-name-wrapper'>
          <p className='light-text officer-card-rank'>{ rank }</p>
          <p className='bold-text officer-card-name'>{ fullName }</p>
        </div>
        <div className='coaccusal-count'>{ pluralize('coaccusal', coaccusalCount, true) }</div>
        <PlusButton onClick={ this.handleClick } />
      </Link>
    );
  }
}

RelevantCoaccusalCard.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  percentile: PropTypes.object,
  rank: PropTypes.string,
  coaccusalCount: PropTypes.number,
  complaintCount: PropTypes.number,
  addItemInPinboardPage: PropTypes.func,
};

export const RelevantCoaccusalCardWithUndo = withUndoCard(
  RelevantCoaccusalCard,
  props => `${get(props, 'fullName', '')} added.`,
  'addItemInPinboardPage',
  {
    theme: PINBOARD_PAGE.UNDO_CARD_THEMES.DARK,
    keepVisible: false,
    hasWrapper: false,
  }
);
