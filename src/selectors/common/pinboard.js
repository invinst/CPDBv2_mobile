import { createSelector } from 'reselect';

import { isItemPinned, pinboardItemsSelector } from 'selectors/pinboard-page/pinboard';
import constants from 'constants';


export const createWithIsPinnedSelector = (cardsSelector, pinnedType) => createSelector(
  cardsSelector,
  pinboardItemsSelector,
  (cards, pinboardItems) => {
    const idField = pinnedType === constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.CR ? 'crid' : 'id';
    return cards.map(item => ({
      ...item,
      isPinned: isItemPinned(pinnedType, item[idField], pinboardItems),
    }));
  },
);
