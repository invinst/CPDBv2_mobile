import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import relevantDocuments from './relevant-documents';
import relevantCoaccusals from './relevant-coaccusals';
import relevantComplaints from './relevant-complaints';
import officerItems from './officer-items';
import crItems from './cr-items';
import trrItems from './trr-items';
import pinboard from './pinboard';
import initialRequested from './initial-requested';
import pinnedItemsRequested from './pinned-items-requested';
import cms from './cms';
import pinboards from './pinboards';
import isShownPinboardsList from './is-shown-pinboards-list';


export default combineReducers({
  pinboard,
  graphData,
  geographicData,
  relevantDocuments,
  relevantCoaccusals,
  relevantComplaints,
  officerItems,
  crItems,
  trrItems,
  initialRequested,
  pinnedItemsRequested,
  cms,
  pinboards,
  isShownPinboardsList,
});
