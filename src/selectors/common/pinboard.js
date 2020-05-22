import { createSelector } from 'reselect';
import { get } from 'lodash';
import moment from 'moment';

import {
  isItemPinned,
  pinboardItemsSelector,
  pinboardPinnedItemsTransform,
  pinboardPinnedItemsMapping,
} from 'selectors/pinboard-page/pinboard';
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

const getHeaderPinboards = state => get(state, 'headers.pinboards', []);

export const pinboardsMenuSelector = (idSelector, itemType) => createSelector(
  getHeaderPinboards,
  state => state.pinboardPage.pinboard,
  (_, props) => idSelector(props),
  (pinboards, currentPinboard, id) => pinboards.map(pinboard => {
    const isCurrent = pinboard.id === currentPinboard.id;
    const pinboardData = pinboardPinnedItemsTransform(isCurrent ? currentPinboard : pinboard);
    const isPinned = isItemPinned(itemType, id, pinboardPinnedItemsMapping(pinboardData));
    return {
      id: pinboard['id'].toString(),
      title: get(pinboard, 'title', ''),
      createdAt: moment(pinboard['created_at']).format(constants.SIMPLE_DATE_FORMAT),
      isPinned,
      isCurrent,
    };
  }),
);

export const showSelectPinboardsSelector = createSelector(
  getHeaderPinboards,
  pinboards => pinboards.length > 1,
);
