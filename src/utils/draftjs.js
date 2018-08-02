import { convertFromRaw, EditorState } from 'draft-js';
import { isEmpty } from 'lodash';

export const convertContentStateToEditorState = rawContentState => (
  isEmpty(rawContentState) ?
    EditorState.createEmpty() :
    EditorState.createWithContent(convertFromRaw(rawContentState))
);
