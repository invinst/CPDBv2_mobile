import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import Cr from './showings/cr';
// import Trr from './showings/trr';
// import Award from './showings/award';
// import UnitChange from './showings/unit-change';
// import Joined from './showings/joined';
// import Year from './showings/year';
// import Empty from './showings/empty';
import { NEW_TIMELINE_ITEMS } from 'constants';
import styles from './item.sass';


export default class Item extends Component {

  constructor(props) {
    super(props);
    // this.renderRankAndUnit = this.renderRankAndUnit.bind(this);

    const { item } = props;

    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: {
        height: 58,
        className: 'test--timeline-cr-item',
        item: <Cr { ...this.props } />
      },
      // [NEW_TIMELINE_ITEMS.FORCE]: {
      //   height: 58,
      //   className: 'test--timeline-trr-item',
      //   item: <Trr { ...this.props } baseStyles={ baseStyles }/>
      // },
      // [NEW_TIMELINE_ITEMS.AWARD]: {
      //   height: 58,
      //   className: 'test--timeline-award-item',
      //   item: <Award { ...this.props } baseStyles={ baseStyles }/>
      // },
      // [NEW_TIMELINE_ITEMS.UNIT_CHANGE]: {
      //   height: 24,
      //   className: 'test--timeline-unit-change-item',
      //   item: <UnitChange { ...this.props } baseStyles={ baseStyles }/>
      // },
      // [NEW_TIMELINE_ITEMS.JOINED]: {
      //   height: 24,
      //   className: 'test--timeline-joined-item',
      //   item: <Joined { ...this.props } baseStyles={ baseStyles }/>
      // },
      // [NEW_TIMELINE_ITEMS.YEAR]: {
      //   height: item.hasData ? 64 : 32,
      //   className: 'test--timeline-year-item',
      //   item: <Year { ...this.props } baseStyles={ baseStyles }/>
      // },
      // [NEW_TIMELINE_ITEMS.EMPTY]: {
      //   height: 32,
      //   className: 'test--timeline-empty-item',
      //   item: <Empty { ...this.props } baseStyles={ baseStyles }/>
      // },
    };

    this.component = get(componentMap, item.kind, {});
  }

  render() {
    const { height, className, item } = this.component;
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
  openComplaintPage: PropTypes.func,
};
