import React, { Component, PropTypes } from 'react';
import { map, filter } from 'lodash';

import SectionTitle from 'components/ComplaintPage/SectionTitle';
import style from 'styles/ComplaintPage/InvestigationTimeline.sass';

const softGrayColor = '#979797';
const altoColor = '#d8d8d8';
const mediumGrayColor = '#9b9b9b';
const hardBlackColor = '#1a1818';

const milestoneDistance = 75;

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
      { key: '1', r: '7.5', cx: '9', strokeWidth: '3', stroke: softGrayColor, fill: 'white' },
      { key: '2', r: '3', cx: '9', fill: softGrayColor },
      { key: '3', r: '9', cx: '9', fill: softGrayColor }
    ];

    return (
      <g>
        <line x1='9' y1='1' x2='9' y2={ lineHeight } stroke={ altoColor } strokeWidth={ 2 } />
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
              <text x='26' y={ currentY } className='date' fill={ mediumGrayColor }>
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
        <SectionTitle title='Investigation Timeline' />
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
  incidentDate: PropTypes.string
};
