import React, { Component, PropTypes } from 'react';
import { nth, isEmpty } from 'lodash';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';
import { TIMELINE_ITEMS } from 'constants/officer-page/tabbed-pane-section/timeline';


export default class Timeline extends Component {
  componentDidMount() {
    const { items, getOfficerTimeline, officerId } = this.props;
    if (isEmpty(items)) {
      getOfficerTimeline(officerId);
    }
  }

  renderItems() {
    const { items, pathname } = this.props;
    return (
      <div>
        {
          items.map((item, index) => {
            const nextItem = nth(items, index + 1);

            const hasBorderBottom = (
              item.kind !== TIMELINE_ITEMS.UNIT_CHANGE
              && nextItem !== undefined
              && nextItem.kind !== TIMELINE_ITEMS.UNIT_CHANGE
              && nextItem.kind !== TIMELINE_ITEMS.JOINED
            );

            return (
              <Item
                item={ item }
                key={ item.key }
                hasBorderBottom={ hasBorderBottom }
                pathname={ pathname }
              />
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className={ cx(style.officerTimeline, 'test--officer-timeline') }>
        <div className='timeline-label'>OFFICER TIMELINE</div>
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  getOfficerTimeline: PropTypes.func,
  officerId: PropTypes.number,
  pathname: PropTypes.string,
};

Timeline.defaultProps = {
  items: [],
};
