import React, { Component, PropTypes } from 'react';
import { nth } from 'lodash';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';
import { TIMELINE_ITEMS } from 'constants/officer-page/tabbed-pane-section/timeline';


export default class Timeline extends Component {
  renderItems() {
    const { items, pathname, onTrackingAttachment } = this.props;
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
                onTrackingAttachment={ onTrackingAttachment }

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
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,

};

Timeline.defaultProps = {
  items: [],
};
