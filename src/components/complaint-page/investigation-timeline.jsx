import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, filter } from 'lodash';

import style from './investigation-timeline.sass';

const greydishColor = '#adadad';
const altoColor = '#d8d8d8';
const boulderColor = '#767676';
const hardBlackColor = '#1a1818';

const milestoneDistance = 61;

export default class InvestigationTimeline extends Component {
  getTimeLine() {
    const { startDate, endDate, incidentDate } = this.props;

    const result = [];
    result.push({ date: incidentDate, events: ['Incident Occurs'] });
    if (startDate && startDate === incidentDate) {
      filter(result, obj => obj.date === incidentDate)[0].events.push('Investigation Begins');
    } else {
      result.push({ date: startDate, events: ['Investigation Begins'] });
    }

    if (endDate && endDate === startDate) {
      filter(result, obj => obj.date === startDate)[0].events.push('Investigation Closed');
    } else {
      result.push({ date: endDate, events: ['Investigation Closed'] });
    }

    return result;
  }

  computeLineHeight(timeline) {
    const numberOfMilestones = Object.keys(timeline).length;
    return milestoneDistance * (numberOfMilestones - 1);
  }

  renderInvestigationTimelineCircles() {
    const timeline = this.getTimeLine();
    const lineHeight = this.computeLineHeight(timeline);
    const timelineCircleDisplayProps = [
      { key: '1', r: '5.5', cx: '9', strokeWidth: '1', stroke: greydishColor, fill: 'white' },
      { key: '2', r: '2.5', cx: '9', fill: greydishColor },
      { key: '3', r: '5.5', cx: '9', fill: greydishColor },
    ];

    return (
      <g>
        <line x1='9' y1='9' x2='9' y2={ lineHeight + 9 } stroke={ altoColor } strokeWidth={ 1 } />
        {
          map(timeline, ({ events }, index) => {
            return map(events, event => {
              const props = timelineCircleDisplayProps.shift();
              return <circle { ...props } cy={ 9 + index * milestoneDistance } />;
            });
          })
        }
      </g>
    );
  }

  renderInvestigationTimelineTexts() {
    const timeline = this.getTimeLine();

    return (
      <g>
        {
          map(timeline, ({ date, events }, index) => {
            const currentY = 14 + index * milestoneDistance;
            const dateText = !date ? null : (
              <text x='26' y={ currentY } className='date' fill={ boulderColor }>
                { date }
              </text>
            );
            const eventTexts = map(events, (event, ind) => (
              <text
                className='event'
                x='26' y={ currentY + 16 * (ind + (date ? 1 : 0)) }
                fill={ hardBlackColor }>
                { event }
              </text>
            ));
            return [dateText, ...eventTexts];
          })
        }
      </g>
    );
  }

  render() {
    const { endDate } = this.props;
    const timeline = this.getTimeLine();
    const lineHeight = this.computeLineHeight(timeline);
    const viewBoxHeight = 20 + 16 * (filter(timeline, obj => obj.date === endDate)[0].events.length) + lineHeight;

    return (
      <div className={ style.investigationTimeline }>
        <div className='header'>
          INVESTIGATION TIMELINE
        </div>
        <svg className='svg' x='0px' y='0px' viewBox={ `0 0 304 ${ viewBoxHeight }` }>
          { this.renderInvestigationTimelineCircles() }
          { this.renderInvestigationTimelineTexts() }
        </svg>
      </div>
    );
  }
}

InvestigationTimeline.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string,
};
