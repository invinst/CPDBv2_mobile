import { getComplaintID } from 'selectors/complaint-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboard';
import constants from 'constants';

export const crPinboardsMenuSelector = pinboardsMenuSelector(
  getComplaintID,
  constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.CR
);
