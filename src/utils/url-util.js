import config from 'config';
import { kebabCase, invert } from 'lodash';

import { OFFICER_PATH } from 'constants/paths';
import { TAB_MAP } from 'constants/officer-page';


export const v2Url = (endpoint) => `${config.baseUrlV2V2 || ''}${endpoint || ''}`;

export const officerUrl = (officerId, name = '', tab = '') => {
  const nameSuffix = name && `${kebabCase(name)}/`;
  const tabName = invert(TAB_MAP)[tab];
  const tabSuffix = tabName ? `${tabName}/` : '';
  return officerId && `${OFFICER_PATH}${officerId}/${nameSuffix}${tabSuffix}`;
};

export const getPageRoot = url => url.split('/')[1] || 'landing';
