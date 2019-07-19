import { combineReducers } from 'redux';

import mapCrsData from './map-crs-data';
import mapTrrsData from './map-trrs-data';
import mapCrsDataTotalCount from './map-crs-data-total-count';
import mapTrrsDataTotalCount from './map-trrs-data-total-count';
import requesting from './requesting';
import clearAllMarkers from './clear-all-markers';


export default combineReducers({
  mapCrsData,
  mapTrrsData,
  mapCrsDataTotalCount,
  mapTrrsDataTotalCount,
  requesting,
  clearAllMarkers,
});
