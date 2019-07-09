import { createSelector } from 'reselect';

import { officersTransform, coaccusedDataTransform } from 'selectors/common/social-graph';

const getOfficers = state => state.pinboardPage.graphData.data['officers'] || [];
const getCoaccusedData = state => state.pinboardPage.graphData.data['coaccused_data'] || [];
const getListEvent = state => state.pinboardPage.graphData.data['list_event'] || [];
export const getRequesting = state => state.pinboardPage.graphData.requesting;

const officersSelector = createSelector(
  [getOfficers],
  officers => officers.map(officersTransform)
);

const coaccusedDataSelector = createSelector(
  [getCoaccusedData],
  coaccusedData => coaccusedData.map(coaccusedDataTransform)
);

export const graphDataSelector = (state) => {
  return {
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
  };
};
