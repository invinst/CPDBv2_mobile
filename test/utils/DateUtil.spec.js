import should from 'should';
import { formatDate, getCareerDuration, getCurrentAge } from 'utils/DateUtil';


describe('DateUtil module', function () {
  describe('formatDate function', () => {
    it('should return correct format string', () => {
      formatDate('2017-01-03').should.eql('JAN 3, 2017');
    });

    it('should return null when cannot parse string to moment object', () => {
      should(formatDate(null)).be.null();
      should(formatDate('fdsafdsa')).be.null();
    });
  });

  describe('getCareerDuration function', () => {
    it('should return correct career duration string', () => {
      should(getCareerDuration(null, null)).be.eql('');
      should(getCareerDuration(null, '1999-12-13')).be.eql('INVALID DATE — DEC 13, 1999');
      should(getCareerDuration('1999-12-13', null)).be.eql('DEC 13, 1999 — Present');
      should(getCareerDuration('1999-12-13', '2015-12-23')).be.eql('DEC 13, 1999 — DEC 23, 2015');
    });
  });

  describe('getCurrentAge function', () => {
    it('should return correct current age at 2017 (fixed year for testing)', () => {
      should(getCurrentAge(1970)).be.eql(47);
      should(getCurrentAge(null)).be.eql(null);
    });
  });
});
