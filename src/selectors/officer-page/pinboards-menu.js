import { getOfficerId } from 'selectors/officer-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboards';
import { PINBOARD_PAGE } from 'constants';

export const officerPinboardsMenuSelector = pinboardsMenuSelector(
  getOfficerId,
  PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER
);
