import { convertContentStateToEditorState } from 'utils/draftjs.js';

describe('draftjs utils', function () {
  describe('convertContentStateToEditorState', function () {
    it('should create empty editor state if given empty content state', function () {
      const editorState = convertContentStateToEditorState(null);
      editorState.getCurrentContent().hasText().should.be.false();
    });

    it('should create editor state from given content state', function () {
      const editorState = convertContentStateToEditorState({
        blocks: [
          {
            text: 'abc'
          }
        ],
        entityMap: {}
      });
      editorState.getCurrentContent().getFirstBlock().getText().should.eql('abc');
    });
  });
});
