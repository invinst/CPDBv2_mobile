import f from 'utils/tests/f';
import OfficerPresenter from 'presenters/OfficerPresenter';

require('tests/factories/OfficerFactory');
require('should');

describe('OfficerPresenter', () => {
  describe('#url', () => {
    it('should return the mobile url for officer page', () => {
      const officer = f.create('Officer', {'id': 1, 'officer_first': 'first', 'officer_last': 'last'});
      const presenter = OfficerPresenter(officer);

      const expectedUrl = '/officer/first-last/1';
      presenter.url.should.be.eql(expectedUrl);
    });
  });
});
