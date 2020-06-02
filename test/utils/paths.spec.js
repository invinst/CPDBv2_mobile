import { getPathNameKey, onOfficerPage, onCrPage, onPinboardPage } from 'utils/paths';


describe('path utils', function () {
  describe('getPathNameKey', function () {
    it('should give the same key for officer page with same officer id', function () {
      const officerKey = getPathNameKey('/officer/123/');
      const officerWithNameKey = getPathNameKey('/officer/123/edward-may');
      officerKey.should.equal('/officer/123/');
      officerWithNameKey.should.equal('/officer/123/');
    });

    it('should give the same key for pinboard page with same id', function () {
      const pinboardOldTitleKey = getPathNameKey('/pinboard/123/old-title');
      const pinboardNewTitleKey = getPathNameKey('/pinboard/123/new-title');
      pinboardOldTitleKey.should.equal('/pinboard/123/');
      pinboardNewTitleKey.should.equal('/pinboard/123/');
    });

    it('should return pathname', function () {
      const trrKey = getPathNameKey('/trr/123/');
      trrKey.should.equal('/trr/123/');
    });
  });

  describe('onOfficerPage', function () {
    it('should return correct value', function () {
      onOfficerPage('/officer/12074/keith-herrera/').should.be.true();
      onOfficerPage('/complaint/259069/').should.be.false();
      onOfficerPage('/embed/officers/').should.be.false();
    });
  });

  describe('onCrPage', function () {
    it('should return correct value', function () {
      onCrPage('/complaint/259069/').should.be.true();
      onCrPage('/officer/12074/keith-herrera/').should.be.false();
      onCrPage('/pinboard/').should.be.false();
    });
  });

  describe('onPinboardPage', function () {
    it('should return correct value', function () {
      onPinboardPage('/pinboard/f306ed76/untitled-pinboard/').should.be.true();
      onPinboardPage('/complaint/259069/').should.be.false();
      onPinboardPage('/officer/12074/keith-herrera/').should.be.false();
    });
  });
});
