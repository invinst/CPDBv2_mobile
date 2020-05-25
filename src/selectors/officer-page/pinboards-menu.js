import { getOfficerId } from 'selectors/officer-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboard';
import constants from 'constants';

export const officerPinboardsMenuSelector = pinboardsMenuSelector(
  getOfficerId,
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER
);
