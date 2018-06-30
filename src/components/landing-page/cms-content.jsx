import React, { PropTypes } from 'react';
import { Editor } from 'draft-js';

const CMSContent = ({ field }) => {
  if (!field) {
    return null;
  }

  return (
    <Editor
      editorState={ field }
      readonly={ true } />
  );
};

CMSContent.propTypes = {
  field: PropTypes.object
};

export default CMSContent;
