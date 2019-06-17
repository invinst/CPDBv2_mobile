import { createSelector } from 'reselect';
import { map } from 'lodash';

import { officerCardTransform } from 'selectors/officer-page/officer-card';


const officerPinnedTransform = (officer) => ({
  ...officerCardTransform(officer),
  type: 'OFFICER',
  isPinned: true,
  id: officer['id'].toString(),
  complaintCount: officer['complaint_count'],
});

const crPinnedTransform = (cr) => ({
  id: cr['crid'],
  type: 'CR',
  isPinned: true,
  incidentDate: cr['incident_date'],
  category: cr['category'],
  point: cr['point'],
});

const trrPinnedTransform = (trr) => ({
  id: trr['id'].toString(),
  type: 'TRR',
  isPinned: true,
  category: trr['category'],
  trrDate: trr['trr_datetime'],
  point: trr['point'],
});

export const pinnedOfficersSelector = createSelector(
  state => state.pinboardPage.officerItems,
  officers => map(officers, officerPinnedTransform)
);

export const pinnedCRsSelector = createSelector(
  state => state.pinboardPage.crItems,
  crs => map(crs, crPinnedTransform)
);

export const pinnedTRRsSelector = createSelector(
  state => state.pinboardPage.trrItems,
  trrs => map(trrs, trrPinnedTransform)
);
