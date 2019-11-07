import { combineReducers } from 'redux';

import graphData from './graph-data';
import geographicData from './geographic-data';
import currentTab from './current-tab';
import relevantDocuments from './relevant-documents';
import relevantCoaccusals from './relevant-coaccusals';
import relevantComplaints from './relevant-complaints';
import officerItems from './officer-items';
import crItems from './cr-items';
import trrItems from './trr-items';
import pinboard from './pinboard';
import initialRequested from './initial-requested';
import cms from './cms';


export default combineReducers({
  pinboard,
  graphData,
  geographicData,
  currentTab,
  relevantDocuments,
  relevantCoaccusals,
  relevantComplaints,
  officerItems,
  crItems,
  trrItems,
  initialRequested,
  cms,
});
