import React, { PropTypes } from 'react';
import { Editor } from 'draft-js';

const CMSContent = ({ content, className }) => {
  if (!content) {
    return null;
  }

  return (
    <div className={ className }>
      <Editor
        editorState={ content }
        readonly={ true } />
    </div>
  );
};

CMSContent.propTypes = {
  content: PropTypes.object,
  className: PropTypes.string
};

export default CMSContent;
