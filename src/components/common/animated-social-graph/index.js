import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import SocialGraph from './social-graph';
import styles from './animated-social-graph.sass';
import withLoadingSpinner from 'components/common/with-loading-spinner';

const AMINATE_SPEED = 150;


export default class AnimatedSocialGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineIdx: 0,
      refreshIntervalId: null,
    };

    this.startTimelineFromBeginning = this.startTimelineFromBeginning.bind(this);
    this.stopTimeline = this.stopTimeline.bind(this);
    this.intervalTickTimeline = this.intervalTickTimeline.bind(this);
  }

  componentWillUnmount() {
    this.stopTimeline();
  }

  startTimeline() {
    this.setState({ refreshIntervalId: setInterval(this.intervalTickTimeline, AMINATE_SPEED) });
  }

  stopTimeline() {
    const { refreshIntervalId } = this.state;
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      this.setState({ refreshIntervalId: null });
    }
  }

  startTimelineFromBeginning() {
    this.stopTimeline();
    this.setState({ timelineIdx: 0 });
    this.startTimeline();
  }

  intervalTickTimeline() {
    const { timelineIdx } = this.state;
    if (timelineIdx < this.props.listEvent.length - 1) {
      this.setState({ timelineIdx: timelineIdx + 1 });
    } else {
      this.stopTimeline();
    }
  }

  render() {
    const { officers, coaccusedData, listEvent } = this.props;
    const { timelineIdx, refreshIntervalId } = this.state;

    return (
      <div className={ styles.animatedSocialGraph }>
        {
          isEmpty(officers) || (
            <SocialGraph
              officers={ officers }
              coaccusedData={ coaccusedData }
              listEvent={ listEvent }
              timelineIdx={ timelineIdx }
              startTimelineFromBeginning={ this.startTimelineFromBeginning }
              collideNodes={ !refreshIntervalId }
              stopTimeline={ this.stopTimeline }
            />
          )
        }
        <button className='refresh-button' onClick={ this.startTimelineFromBeginning }/>
      </div>
    );
  }
}

AnimatedSocialGraph.propTypes = {
  officers: PropTypes.array,
  coaccusedData: PropTypes.array,
  listEvent: PropTypes.array,
};

export const AnimatedSocialGraphWithSpinner = withLoadingSpinner(AnimatedSocialGraph, styles.socialGraphLoading);
