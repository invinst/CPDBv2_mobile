import { v2Url, officerUrl, getPageRoot } from 'utils/url-util';


describe('URL util module', function () {
  describe('v2Url', function () {
    it('should return correct url', function () {
      v2Url('endpoint').should.eql('endpoint');
    });
  });

  describe('officerUrl', function () {
    it('should return correct officer url', function () {
      officerUrl(123).should.eql('/officer/123/');
      officerUrl(123, 'Kevin Wang').should.eql('/officer/123/kevin-wang/');
      officerUrl(123, 'Kevin Wang', 'DOCUMENTS').should.eql('/officer/123/kevin-wang/documents/');
      officerUrl(123, 'Kevin Wang', 'DOCUMENT').should.eql('/officer/123/kevin-wang/');
      officerUrl(123, 'Kevin Wang', 'COACCUSALS').should.eql('/officer/123/kevin-wang/coaccusals/');
      officerUrl(123, 'Kevin Wang', 'TIMELINE').should.eql('/officer/123/kevin-wang/');
    });
  });

  describe('getPageRoot', function () {
    it('should return landing if url is /', function () {
      getPageRoot('/').should.equal('landing');
    });

    it('should return first section', function () {
      getPageRoot('/search/').should.equal('search');
      getPageRoot('/pinboard/abc123/').should.equal('pinboard');
      getPageRoot('/officer/123/').should.equal('officer');
    });
  });
});
