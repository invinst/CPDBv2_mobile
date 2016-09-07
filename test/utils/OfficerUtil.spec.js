import 'should';
import OfficerUtil from 'utils/OfficerUtil';


describe('OfficerUtil', () => {
  it('return color level regarding the allegation count', () => {
    OfficerUtil.getColorLevelClass('prefix', 1).should.be.equal('prefix-4')
  });

  it('should return empty if allegationCount is less than 0', () => {
    OfficerUtil.getColorLevelClass('prefix', -1).should.be.equal('')
  });
});
