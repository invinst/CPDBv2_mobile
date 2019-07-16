import { isEmpty, isNull } from 'lodash';
import { createSelector } from 'reselect';

import { geographicDataRequestingSelector, hasMapMarkersSelector } from './geographic-data';
import { getSocialGraphRequesting, getCoaccusedData } from './social-graph';
import constants from 'constants';


export const defaultTabSelector = createSelector(
  getSocialGraphRequesting,
  geographicDataRequestingSelector,
  getCoaccusedData,
  hasMapMarkersSelector,
  (socialGraphRequesting, geographicDataRequesting, coaccusedData, hasMapMarkers) => {
    if (!socialGraphRequesting && !geographicDataRequesting) {
      if (isEmpty(coaccusedData) && hasMapMarkers) {
        return constants.PINBOARD_PAGE.TAB_NAMES.GEOGRAPHIC;
      } else {
        return constants.PINBOARD_PAGE.TAB_NAMES.NETWORK;
      }
    } else {
      return null;
    }
  }
);

export const getCurrentTab = (state) => {
  const currentTab = state.pinboardPage.currentTab;
  if (isNull(currentTab)) {
    return defaultTabSelector(state);
  } else {
    if (currentTab === constants.PINBOARD_PAGE.TAB_NAMES.GEOGRAPHIC && !hasMapMarkersSelector(state)) {
      return constants.PINBOARD_PAGE.TAB_NAMES.NETWORK;
    }
    return currentTab;
  }
};
