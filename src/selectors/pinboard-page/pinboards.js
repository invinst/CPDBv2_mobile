import { createSelector } from 'reselect';
import { get } from 'lodash';
import moment from 'moment';

import { generatePinboardUrl } from 'utils/pinboard';
import constants from 'constants';


export const pinboardsSelector = createSelector(
  state => state.pinboardPage.pinboards,
  pinboards => pinboards.map(pinboard => ({
    id: pinboard['id'].toString(),
    title: get(pinboard, 'title', ''),
    createdAt: moment(pinboard['created_at']).format(constants.SIMPLE_DATE_FORMAT),
    url: generatePinboardUrl(pinboard),
  }))
);

export const getShowPinboardsList = state => state.pinboardPage.isShownPinboardsList;
