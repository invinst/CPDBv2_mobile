import { get, isUndefined } from 'lodash';
import { createSelector } from 'reselect';

import { getOfficerInfo } from 'selectors/officer-page';
import { MAP_ITEMS } from 'constants/officer-page/tabbed-pane-section/map';


export const mapLegendSelector = createSelector(
  getOfficerInfo,
  info => ({
    unsustainedCount: get(info, 'unsustained_count'),
    sustainedCount: get(info, 'sustained_count'),
    useOfForceCount: get(info, 'trr_count'),
  })
);

const getMapMarkers = (state, officerId) => get(state.officerPage.timeline.data, String(officerId), []);

const isMapMarker = item => (
  item.kind === MAP_ITEMS.CR && ['Not Sustained', 'Sustained'].includes(item.finding)
  || item.kind === MAP_ITEMS.FORCE
);

export const rawMapMarkersSelector = createSelector(
  getMapMarkers,
  items => items.filter(isMapMarker)
);

export const hasMapMarkersSelector = createSelector(
  getMapMarkers,
  items => !isUndefined(items.find(isMapMarker))
);

export const crMapMarkersTransform = item => ({
  point: get(item, 'point', {
    lon: 0, lat: 0
  }),
  kind: item.kind,
  finding: item.finding,
  id: item.crid,
  category: item.category,
  victims: item.victims,
  coaccused: item.coaccused,
});

export const trrMapMarkerTransform = item => ({
  point: get(item, 'point', {
    lon: 0, lat: 0
  }),
  kind: item.kind,
  id: item.trr_id.toString(),
  category: item['firearm_used'] ? 'Firearm' : item.taser ? 'Taser' : 'Use of Force Report',
});

export const mapMarkersSelector = createSelector(
  rawMapMarkersSelector,
  markers => markers.map(marker => {
    if (marker.kind === MAP_ITEMS.CR) {
      return crMapMarkersTransform(marker);
    }
    if (marker.kind === MAP_ITEMS.FORCE) {
      return trrMapMarkerTransform(marker);
    }
  })
);
