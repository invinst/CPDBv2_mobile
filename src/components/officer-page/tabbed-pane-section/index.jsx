import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';
import cx from 'classnames';

import OfficerTimelineContainer from 'containers/officer-page/officer-timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import { OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import style from './tabbed-pane-section.sass';


export default class TabbedPaneSection extends Component {
  render() {
    const {
      currentTab,
      changeOfficerTab,
      hasCoaccusal,
      officerId
    } = this.props;
    const tabbedPaneMap = {
      [OFFICER_PAGE_TAB_NAMES.TIMELINE]: {
        component: OfficerTimelineContainer,
        show: true,
      },
      [OFFICER_PAGE_TAB_NAMES.COACCUSALS]: {
        component: CoaccusalsContainer,
        show: hasCoaccusal,
      },
    };
    const CurrentComponent = get(tabbedPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ style.tabbedPaneSection }>
        <div className='tabbed-pane-section-menu'>
          {
            keys(tabbedPaneMap).map(paneName => (
              get(tabbedPaneMap, `${paneName}.show`) ? (
                <span
                  key={ paneName }
                  className={ cx('tabbed-pane-tab-name', { 'active': paneName === currentTab }) }
                  onClick={ () => changeOfficerTab(paneName) }
                >
                  { paneName }
                </span>
              ) : null
            ))
          }
        </div>
        { CurrentComponent ? <CurrentComponent officerId={ officerId }/> : null }
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  officerId: PropTypes.number,
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasCoaccusal: PropTypes.bool
};
