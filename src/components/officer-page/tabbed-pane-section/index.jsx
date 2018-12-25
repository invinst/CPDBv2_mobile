import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';
import cx from 'classnames';

import HorizontalScrolling from 'components/common/horizontal-scrolling';
import OfficerTimelineContainer from 'containers/officer-page/officer-timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import MapContainer from 'containers/officer-page/map-container';
import OfficerAttachmentsTabContainer from 'containers/officer-page/officer-attachments-container';
import { OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import style from './tabbed-pane-section.sass';


export default class TabbedPaneSection extends Component {
  render() {
    const {
      currentTab,
      changeOfficerTab,
      hasCoaccusal,
      hasAttachment,
      hasMapMarker,
      officerId
    } = this.props;
    const tabbedPaneMap = {
      [OFFICER_PAGE_TAB_NAMES.TIMELINE]: {
        component: OfficerTimelineContainer,
        show: true,
      },
      [OFFICER_PAGE_TAB_NAMES.MAP]: {
        component: MapContainer,
        show: hasMapMarker,
      },
      [OFFICER_PAGE_TAB_NAMES.COACCUSALS]: {
        component: CoaccusalsContainer,
        show: hasCoaccusal,
      },
      [OFFICER_PAGE_TAB_NAMES.ATTACHMENTS]: {
        component: OfficerAttachmentsTabContainer,
        show: hasAttachment,
      },
    };
    const CurrentComponent = get(tabbedPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ style.tabbedPaneSection }>
        <HorizontalScrolling>
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
        </HorizontalScrolling>
        { CurrentComponent ? <CurrentComponent officerId={ officerId }/> : null }
        <HorizontalScrolling>
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
        </HorizontalScrolling>
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  officerId: PropTypes.number,
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasCoaccusal: PropTypes.bool,
  hasAttachment: PropTypes.bool,
  hasMapMarker: PropTypes.bool
};
