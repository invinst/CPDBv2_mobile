import { get, isEmpty, concat } from 'lodash';
import { createSelector } from 'reselect';


const getGeographicCrs = state => state.pinboardPage.geographicData.mapCrsData;
const getGeographicTrrs = state => state.pinboardPage.geographicData.mapTrrsData;
export const getClearAllMarkers = state => state.pinboardPage.geographicData.clearAllMarkers;

export const geographicDataRequestingSelector = createSelector(
  (state) => state.pinboardPage.geographicData.crsRequesting,
  (state) => state.pinboardPage.geographicData.trrsRequesting,
  (crsRequesting, trrsRequesting) => crsRequesting || trrsRequesting
);

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
    lon: 0, lat: 0,
  }),
  date: geographicDatum.date,
  kind: geographicDatum.kind,
  id: geographicDatum.crid,
  category: geographicDatum.category,
});

export const trrMapMarkerTransform = geographicDatum => ({
  point: get(geographicDatum, 'point', {
    lon: 0, lat: 0,
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
