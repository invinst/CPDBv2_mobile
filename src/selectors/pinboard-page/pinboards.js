import { createSelector } from 'reselect';
import { get } from 'lodash';
import moment from 'moment';

import { generatePinboardUrl } from 'utils/pinboard';
import { rawPinboardsSelector } from 'selectors/common/pinboards';
import constants from 'constants';


const pinboardItemTransform = pinboard => ({
  id: pinboard['id'].toString(),
  title: get(pinboard, 'title', ''),
  createdAt: moment(pinboard['created_at']).format(constants.SIMPLE_DATE_FORMAT),
  url: generatePinboardUrl(pinboard),
  isCurrent: get(pinboard, 'is_current', false),
});

export const pinboardsSelector = createSelector(
  rawPinboardsSelector,
  pinboards => pinboards.map(pinboardItemTransform)
);

export const getShowPinboardsList = state => state.pinboardPage.isShownPinboardsList;
