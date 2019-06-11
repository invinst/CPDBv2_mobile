import { get, isEmpty, filter } from 'lodash';
import { createSelector } from 'reselect';

import constants from 'constants';


const getGeographicData = state => get(state, 'pinboardPage.geographicData.data', []);
export const getGeographicDataRequesting = state => get(state, 'pinboardPage.geographicData.requesting', false);

export const mapLegendSelector = createSelector(
  getGeographicData,
  geographicData => ({
    allegationCount: filter(
      geographicData, geographicDatum => geographicDatum.kind === constants.MAP_ITEMS.CR
    ).length,
    useOfForceCount: filter(
      geographicData, geographicDatum => geographicDatum.kind === constants.MAP_ITEMS.FORCE
    ).length,
  })
);

export const hasMapMarkersSelector = createSelector(
  getGeographicData,
  geographicData => !isEmpty(geographicData)
);

export const crMapMarkersTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  kind: geographicDatum.kind,
  id: geographicDatum.crid,
  category: geographicDatum.category,
  victims: geographicDatum.victims,
  coaccused: geographicDatum['coaccused_count'],
});

export const trrMapMarkerTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  kind: geographicDatum.kind,
  id: geographicDatum.trr_id.toString(),
  category: geographicDatum['firearm_used'] ? 'Firearm' : geographicDatum.taser ? 'Taser' : 'Use of Force Report',
});

export const mapMarkersSelector = createSelector(
  getGeographicData,
  markers => markers.map(marker => {
    if (marker.kind === constants.MAP_ITEMS.CR) {
      return crMapMarkersTransform(marker);
    } else if (marker.kind === constants.MAP_ITEMS.FORCE) {
      return trrMapMarkerTransform(marker);
    }
  })
);

export const getCurrentTab = state => {
  if (
    isEmpty(state.pinboardPage.graphData.data['coaccused_data'])
    && isEmpty(state.pinboardPage.geographicData.data)
  ) {
    return constants.PINBOARD_PAGE_TAB_NAMES.NETWORK;
  } else if (isEmpty(state.pinboardPage.graphData.data['coaccused_data'])) {
    return constants.PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC;
  }
  return state.pinboardPage.currentTab;
};
