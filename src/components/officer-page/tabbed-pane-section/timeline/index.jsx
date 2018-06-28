import React, { Component, PropTypes } from 'react';
import { nth, isEmpty } from 'lodash';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';
import { NEW_TIMELINE_ITEMS } from 'constants';
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
    const { items, officerId } = this.props;
    return (
      <div>
        {
          items.map((item, index) => {
            const nextItem = nth(items, index + 1);

            const hasBorderBottom = (
              item.kind !== NEW_TIMELINE_ITEMS.UNIT_CHANGE
              && nextItem !== undefined
              && nextItem.kind !== NEW_TIMELINE_ITEMS.UNIT_CHANGE
              && nextItem.kind !== NEW_TIMELINE_ITEMS.JOINED
            );

            return (
              <Item
                item={ item }
                key={ item.key }
                officerId={ officerId }
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
  changeFilter: PropTypes.func,
  getOfficerTimeline: PropTypes.func,
  officerId: PropTypes.number,
};

Timeline.defaultProps = {
  items: [],
};
