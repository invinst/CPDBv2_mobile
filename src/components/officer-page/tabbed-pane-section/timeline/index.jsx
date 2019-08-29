import React, { Component, PropTypes } from 'react';
import { nth, values, mapValues, map, findKey } from 'lodash';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';
import { TIMELINE_ITEMS, TIMELINE_FILTERS } from 'constants/officer-page/tabbed-pane-section/timeline';
import Dropdown from 'components/shared/dropdown';


export default class Timeline extends Component {
  constructor(props) {
    super(props);

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(label) {
    const key = findKey(TIMELINE_FILTERS, ['label', label]);
    this.props.changeFilter(TIMELINE_FILTERS[key]);
  }

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
    const { filterCount } = this.props;
    const options = values(mapValues(TIMELINE_FILTERS, 'label'));
    const labels = map(
      TIMELINE_FILTERS,
      (filter, key) => key === 'RANK_UNIT_CHANGES' ? filter.label :`${filter.label} (${filterCount[key]})`
    );

    return (
      <div className={ cx(style.officerTimeline, 'test--officer-timeline') }>
        <div className='timeline-filter-wrapper'>
          <Dropdown
            defaultValue={ TIMELINE_FILTERS.ALL.label }
            onChange={ this.handleDropdownChange }
            options={ options }
            className='timeline-filter'
            labels={ labels }
          />
        </div>
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  onTrackingAttachment: PropTypes.func,
  filterCount: PropTypes.object,
  changeFilter: PropTypes.func,
};

Timeline.defaultProps = {
  items: [],
};
