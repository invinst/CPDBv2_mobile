import React, { Component, PropTypes } from 'react';
import { nth, values, isEmpty } from 'lodash';
import cx from 'classnames';

import style from './timeline.sass';
import Item from './item';
import { NEW_TIMELINE_FILTERS, NEW_TIMELINE_ITEMS } from 'constants';
import GaUtil from 'utils/ga-util';
// import Dropdown from 'components/common/dropdown';


export default class Timeline extends Component {
  componentDidMount() {
    const { items, getOfficerTimeline, pk } = this.props;
    if (isEmpty(items)) {
      getOfficerTimeline(pk);
    }
    GaUtil.track('event', 'officer', 'view_detail', window.location.pathname);
  }

  renderHeader() {
    const { changeFilter } = this.props;

    return (
      <div className='header-wrapper'>
        <div className='showing-content-header'>
          <div className='showing-text'>SHOWING</div>
          {/*<Dropdown*/}
            {/*defaultValue={ NEW_TIMELINE_FILTERS.ALL }*/}
            {/*onChange={ changeFilter }*/}
            {/*options={ values(NEW_TIMELINE_FILTERS) }*/}
            {/*className='test--timeline-filter'*/}
            {/*width={ 146 }*/}
          {/*/>*/}
        </div>
      </div>
    );
  }

  renderItems() {
    const { items, officerId, openComplaintPage } = this.props;
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
                openComplaintPage={ openComplaintPage }
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
        {/*{ this.renderHeader() }*/}
        { this.renderItems() }
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  changeFilter: PropTypes.func,
  officerId: PropTypes.number,
  openComplaintPage: PropTypes.func,
};

Timeline.defaultProps = {
  items: [],
};
