import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import Cr from './cr';
import Trr from './trr';
import Award from './award';
import UnitChange from './unit-change';
import RankChange from './rank-change';
import Joined from './joined';
import Year from './year';
import { TIMELINE_ITEMS } from 'constants/officer-page/tabbed-pane-section/timeline';


export default class Item extends Component {

  constructor(props) {
    super(props);

    this.componentMap = {
      [TIMELINE_ITEMS.CR]: {
        className: 'normal-item',
        Component: Cr,
      },
      [TIMELINE_ITEMS.FORCE]: {
        className: 'normal-item',
        Component: Trr,
      },
      [TIMELINE_ITEMS.AWARD]: {
        className: 'normal-item',
        Component: Award,
      },
      [TIMELINE_ITEMS.UNIT_CHANGE]: {
        className: 'change-item',
        Component: UnitChange,
      },
      [TIMELINE_ITEMS.RANK_CHANGE]: {
        className: 'change-item',
        Component: RankChange,
      },
      [TIMELINE_ITEMS.JOINED]: {
        className: 'joined-item',
        Component: Joined,
      },
      [TIMELINE_ITEMS.YEAR]: {
        className: 'normal-item',
        Component: Year,
      },
    };
  }

  render() {
    const { item } = this.props;
    const { className, Component } = get(this.componentMap, item.kind);
    if (!Component)
      return null;
    return <Component className={ className } { ...this.props }/>;
  }
}

Item.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
};
