import {
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS,
  NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE,
} from 'actions/landing-page';
import newDocumentAllegations from 'reducers/landing-page/new-document-allegations';


describe('newDocumentAllegations reducer', function () {
  it('should return initial state', function () {
    newDocumentAllegations(undefined, []).should.be.empty();
  });

  it('should handle NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS', function () {
    newDocumentAllegations({}, {
      type: NEW_DOCUMENT_ALLEGATIONS_REQUEST_SUCCESS,
      payload: 'abc',
    }).should.eql('abc');
  });

  it('should handle NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE', function () {
    newDocumentAllegations('abc', {
      type: NEW_DOCUMENT_ALLEGATIONS_REQUEST_FAILURE,
      payload: {},
    }).should.eql('abc');
  });
});
