import { getComplaintID } from 'selectors/complaint-page';
import { pinboardsMenuSelector } from 'selectors/common/pinboards';
import { PINBOARD_PAGE } from 'constants';

export const crPinboardsMenuSelector = pinboardsMenuSelector(
  getComplaintID,
  PINBOARD_PAGE.PINNED_ITEM_TYPES.CR
);
