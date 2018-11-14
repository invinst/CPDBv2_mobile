import { v2Url, officerUrl } from 'utils/url-util';


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
      officerUrl(123, 'Kevin Wang', 'ATTACHMENTS').should.eql('/officer/123/kevin-wang/documents/');
      officerUrl(123, 'Kevin Wang', 'ATTACHMENT').should.eql('/officer/123/kevin-wang/');
      officerUrl(123, 'Kevin Wang', 'COACCUSALS').should.eql('/officer/123/kevin-wang/coaccusals/');
      officerUrl(123, 'Kevin Wang', 'TIMELINE').should.eql('/officer/123/kevin-wang/');
    });
  });
});
