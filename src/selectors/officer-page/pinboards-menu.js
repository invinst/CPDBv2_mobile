import { getOfficerId } from 'selectors/officer-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboards';
import constants from 'constants';

export const officerPinboardsMenuSelector = pinboardsMenuSelector(
  getOfficerId,
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER
);
