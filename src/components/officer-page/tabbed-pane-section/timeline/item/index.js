import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import Cr from './showings/cr';
import Trr from './showings/trr';
import Award from './showings/award';
import UnitChange from './showings/unit-change';
import Joined from './showings/joined';
import Year from './showings/year';
import { NEW_TIMELINE_ITEMS } from 'constants';
import styles from './item.sass';


export default class Item extends Component {

  constructor(props) {
    super(props);
    const { item } = props;

    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: {
        height: 58,
        className: 'test--timeline-cr-item',
        item: <Cr { ...this.props } />
      },
      [NEW_TIMELINE_ITEMS.FORCE]: {
        height: 58,
        className: 'test--timeline-trr-item',
        item: <Trr { ...this.props }/>
      },
      [NEW_TIMELINE_ITEMS.AWARD]: {
        height: 58,
        className: 'test--timeline-award-item',
        item: <Award { ...this.props } />
      },
      [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: {
        height: 24,
        className: 'test--timeline-unit-change-item',
        item: <UnitChange { ...this.props } />
      },
      [NEW_TIMELINE_ITEMS.JOINED]: {
        height: 24,
        className: 'test--timeline-joined-item',
        item: <Joined { ...this.props } />
      },
      [NEW_TIMELINE_ITEMS.YEAR]: {
        height: item.hasData ? 64 : 32,
        className: 'test--timeline-year-item',
        item: <Year { ...this.props } />
      },
    };

    this.component = get(componentMap, item.kind, {});
  }

  render() {
    const { className, item } = this.component;
    return (
      <div className={ cx(styles.wrapperStyle, className) }>
        { item }
      </div>
    );
  }

}

Item.propTypes = {
  item: PropTypes.object,
  officerId: PropTypes.number,
};
