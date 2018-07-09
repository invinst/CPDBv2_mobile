import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import Cr from './cr';
import Trr from './trr';
import Award from './award';
import UnitChange from './unit-change';
import Joined from './joined';
import Year from './year';
import { TIMELINE_ITEMS } from 'constants/officer-page/tabbed-pane-section/timeline';
import styles from './item.sass';


export default class Item extends Component {

  constructor(props) {
    super(props);
    const { item } = props;

    const componentMap = {
      [TIMELINE_ITEMS.CR]: {
        className: 'test--timeline-cr-item',
        item: <Cr { ...this.props } />
      },
      [TIMELINE_ITEMS.FORCE]: {
        className: 'test--timeline-trr-item',
        item: <Trr { ...this.props }/>
      },
      [TIMELINE_ITEMS.AWARD]: {
        className: 'test--timeline-award-item',
        item: <Award { ...this.props } />
      },
      [TIMELINE_ITEMS.UNIT_CHANGE]: {
        className: 'test--timeline-unit-change-item',
        item: <UnitChange { ...this.props } />
      },
      [TIMELINE_ITEMS.JOINED]: {
        className: 'test--timeline-joined-item',
        item: <Joined { ...this.props } />
      },
      [TIMELINE_ITEMS.YEAR]: {
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
};
