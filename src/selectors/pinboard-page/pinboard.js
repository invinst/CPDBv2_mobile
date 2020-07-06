import { get, map, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import { generatePinboardUrl, isEmptyPinboard } from 'utils/pinboard';
import { PINBOARD_PAGE } from 'constants';

export const getInitialRequested = state => get(state, 'pinboardPage.initialRequested', false);

const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return get(pinboard, 'officer_ids', []).length +
    get(pinboard, 'crids', []).length +
    get(pinboard, 'trr_ids', []).length;
};

const getRawPinboard = (state) => get(state, 'pinboardPage.pinboard', {});

export const getPinboard = createSelector(
  getRawPinboard,
  pinboard => ({
    id: get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: get(pinboard, 'title', ''),
    ...pinboardPinnedItemsTransform(pinboard),
    description: get(pinboard, 'description', ''),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    ownedByCurrentUser: get(pinboard, 'ownedByCurrentUser', false),
    crItems: get(pinboard, 'crItems.items', []),
    officerItems: get(pinboard, 'officerItems.items', []),
    trrItems: get(pinboard, 'trrItems.items', []),
    isPinboardRestored: get(pinboard, 'isPinboardRestored', false),
    hasPendingChanges: get(pinboard, 'hasPendingChanges', false),
  })
);

export const getPinboardId = state => get(state, 'pinboardPage.pinboard.id');

export const pinboardPinnedItemsMapping = ({ officerIds, crids, trrIds }) => ({
  [PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER]: officerIds,
  [PINBOARD_PAGE.PINNED_ITEM_TYPES.CR]: crids,
  [PINBOARD_PAGE.PINNED_ITEM_TYPES.TRR]: trrIds,
});

export const pinboardItemsSelector = createSelector(
  getPinboard,
  pinboardPinnedItemsMapping
);

export const isItemPinned = (pinnedItemType, id, pinboardItems) => {
  return Object.prototype.hasOwnProperty.call(pinboardItems, pinnedItemType) &&
    (pinboardItems[pinnedItemType].indexOf(String(id)) !== -1);
};

const getPinnedItemsRequested = state => get(state, 'pinboardPage.pinnedItemsRequested', false);
export const pinboardPageLoadingSelector = createSelector(
  getPinboard,
  getPinnedItemsRequested,
  (pinboard, pinnedItemsRequested) => {
    return (isEmpty(pinboard.id) && pinboard.hasPendingChanges)
      || (!isEmpty(pinboard.id) && pinboard.hasPendingChanges && !pinnedItemsRequested);
  }
);

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);

export const isEmptyPinboardSelector = createSelector(
  getPinboard,
  isEmptyPinboard,
);

export const examplePinboardsSelector = createSelector(
  state => state.pinboardPage.pinboard,
  pinboard => get(pinboard, 'example_pinboards', []),
);

export const hasPendingChangesSelector = createSelector(
  state => get(state, 'pinboardPage.pinboard', {}),
  pinboard => get(pinboard, 'hasPendingChanges', false),
);

export const pinboardPinnedItemsTransform = (pinboard) => ({
  officerIds: map(get(pinboard, 'officer_ids', []), (id) => (id.toString())),
  crids: get(pinboard, 'crids', []),
  trrIds: map(get(pinboard, 'trr_ids', []), (id) => (id.toString())),
});
