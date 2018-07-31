import { find, get, isEmpty, isNil } from 'lodash';
import { convertContentStateToEditorState } from 'utils/draftjs';


export const hasCMS = (state, cmsPage) => !isNil(state[cmsPage]) && !isEmpty(state[cmsPage].cms);

export const cmsSelector = (state, cmsPage, field) => {
  const cmsField = find(state[cmsPage].cms, { name: field });
  return convertContentStateToEditorState(get(cmsField, 'value', {}));
};
