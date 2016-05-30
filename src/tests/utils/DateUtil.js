import should from 'should';
import DateUtil from 'utils/DateUtil';


describe('DateUtil', () => {
  it('should date with default format', () => {
    const date = '2012-01-19';
    const sanitizeDate = DateUtil.sanitizeDate(date);

    sanitizeDate.date().should.be.equal(19);
    sanitizeDate.month().should.be.equal(0);
    sanitizeDate.year().should.be.equal(2012);
  });

  it('should return null if invalid date', () => {
    const date = 'invalid';
    const sanitizeDate = DateUtil.sanitizeDate(date);

    should(sanitizeDate).be.exactly(null);
  });

  it('should date with the format supplied in arguments', () => {
    const date = '19-02-2012';
    const sanitizeDate = DateUtil.sanitizeDate(date, 'DD-MM-YYYY');

    sanitizeDate.date().should.be.equal(19);
    sanitizeDate.month().should.be.equal(1);
    sanitizeDate.year().should.be.equal(2012);
  });
});


