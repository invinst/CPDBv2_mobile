import should from 'should';

import documentUrl from 'selectors/common/document-url';


describe('documentUrl', () => {
  it('should return null when data is not available', () => {
    should(documentUrl(null)).be.null();
  });

  it('should replace html extension with pdf', () => {
    documentUrl('something.html').should.eql('something.pdf');
  });
});
