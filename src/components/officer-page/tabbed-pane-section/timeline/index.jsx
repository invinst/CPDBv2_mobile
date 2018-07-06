import React, { Component, PropTypes } from 'react';
import { nth, isEmpty } from 'lodash';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';
import { TIMELINE_ITEMS } from 'constants/officer-page/tabbed-pane-section/timeline';
import GaUtil from 'utils/ga-util';


export default class Timeline extends Component {
  componentDidMount() {
    const { items, getOfficerTimeline, officerId } = this.props;
    if (isEmpty(items)) {
      getOfficerTimeline(officerId);
    }
    GaUtil.track('event', 'officer', 'view_detail', window.location.pathname);
  }

  renderItems() {
    const { items } = this.props;
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
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  getOfficerTimeline: PropTypes.func,
  officerId: PropTypes.number,
};

Timeline.defaultProps = {
  items: [],
};
