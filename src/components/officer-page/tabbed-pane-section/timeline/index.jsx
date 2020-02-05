import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { values, mapValues, map, findKey } from 'lodash';

import style from './timeline.sass';
import Item from './item';
import { TIMELINE_FILTERS } from 'constants/officer-page/tabbed-pane-section/timeline';
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

  render() {
    const { filterCount, pathname, items, onTrackingAttachment, selectedFilter } = this.props;
    const options = values(mapValues(TIMELINE_FILTERS, 'label'));
    const labels = map(
      TIMELINE_FILTERS,
      (filter, key) => key === 'RANK_UNIT_CHANGES' ? filter.label :`${filter.label} (${filterCount[key]})`
    );

    return (
      <div className={ style.officerTimeline }>
        <div className='timeline-filter-wrapper'>
          <Dropdown
            defaultValue={ selectedFilter.label }
            onChange={ this.handleDropdownChange }
            options={ options }
            className='timeline-filter'
            labels={ labels }
          />
        </div>
        {
          items.map(item => (
            <Item
              item={ item }
              key={ item.key }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
            />
          ))
        }
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
  selectedFilter: PropTypes.object,
};

Timeline.defaultProps = {
  items: [],
  selectedFilter: {},
};
