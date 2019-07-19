import { get, isEmpty, concat } from 'lodash';
import { createSelector } from 'reselect';

import constants from 'constants';


const getGeographicCrs = state => state.pinboardPage.geographicData.mapCrsData;
const getGeographicTrrs = state => state.pinboardPage.geographicData.mapTrrsData;
export const getGeographicDataRequesting = state => get(state, 'pinboardPage.geographicData.requesting', false);
export const getClearAllMarkers = state => state.pinboardPage.geographicData.clearAllMarkers;

export const mapLegendSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (state) => state.pinboardPage.geographicData.mapCrsDataTotalCount,
  (state) => state.pinboardPage.geographicData.mapTrrsDataTotalCount,
  (geographicCrs, geographicTrrs, crsTotalCount, trrsTotalCount) => ({
    allegationCount: geographicCrs.length,
    useOfForceCount: geographicTrrs.length,
    allegationLoading: geographicCrs.length !== crsTotalCount,
    useOfForceLoading: geographicTrrs.length !== trrsTotalCount,
  })
);

export const hasMapMarkersSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (geographicCrs, geographicTrrs) => !isEmpty(geographicCrs) || !isEmpty(geographicTrrs)
);

export const crMapMarkersTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  date: geographicDatum.date,
  kind: geographicDatum.kind,
  id: geographicDatum.crid,
  category: geographicDatum.category,
});

export const trrMapMarkerTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0
  }),
  date: geographicDatum.date,
  kind: geographicDatum.kind,
  id: geographicDatum.trr_id.toString(),
  category: geographicDatum['firearm_used'] ? 'Firearm' : geographicDatum.taser ? 'Taser' : 'Use of Force Report',
});

export const mapMarkersSelector = createSelector(
  getGeographicCrs,
  getGeographicTrrs,
  (geographicCrs, geographicTrrs) => concat(
    geographicCrs.map(marker => crMapMarkersTransform(marker)),
    geographicTrrs.map(marker => trrMapMarkerTransform(marker)),
  )
);

export const getCurrentTab = state => {
  if (
    isEmpty(state.pinboardPage.graphData.data['coaccused_data'])
    && isEmpty(state.pinboardPage.geographicData.data)
  ) {
    return constants.PINBOARD_PAGE.TAB_NAMES.NETWORK;
  } else if (isEmpty(state.pinboardPage.graphData.data['coaccused_data'])) {
    return constants.PINBOARD_PAGE.TAB_NAMES.GEOGRAPHIC;
  }
  return state.pinboardPage.currentTab;
};
