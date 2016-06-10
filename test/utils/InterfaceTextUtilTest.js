import sinon from 'sinon';
import timekeeper from 'timekeeper';
import should from 'should';

import InterfaceTextUtil from 'utils/InterfaceTextUtil';
import LocalStorageUtil from 'utils/LocalStorageUtil';


describe('InterfaceTextUtil', () => {
  describe('#isExpired', () => {
    it('should return true if expired time is not saved', () => {
      sinon.stub(LocalStorageUtil, 'getItem', key => null);
      InterfaceTextUtil.isExpired().should.be.true();
      LocalStorageUtil.getItem.restore();
    });

    it('should return true if expired time is before now', () => {
      const now = 1330688329323;
      const expired = 1330688329322;

      timekeeper.freeze(new Date(now));

      sinon.stub(LocalStorageUtil, 'getItem', key => {
        if (key == 'interfaceTextExpiredTime') {
          return expired;
        }
        return null;
      });
      InterfaceTextUtil.isExpired().should.be.true();

      LocalStorageUtil.getItem.restore();
    });

    it('should return false if expired time is after now', () => {
      const now = 1330688329322;
      const expired = 1330688329323;

      timekeeper.freeze(new Date(now));

      sinon.stub(LocalStorageUtil, 'getItem', key => {
        if (key == 'interfaceTextExpiredTime') {
          return expired;
        }
        return null;
      });
      InterfaceTextUtil.isExpired().should.be.false();

      LocalStorageUtil.getItem.restore();
    });
  });

  describe('#isCached', () => {
    it('should return false if object is not saved', () => {
      sinon.stub(LocalStorageUtil, 'getItem', key => null);

      InterfaceTextUtil.isCached().should.be.false();

      LocalStorageUtil.getItem.restore();
    });

    it('should return false if time is expired', () => {
      sinon.stub(LocalStorageUtil, 'getItem', key => {
        if (key == 'interfaceTexts') {
          return 'something';
        }
        return null;
      });
      sinon.stub(InterfaceTextUtil, 'isExpired', () => true);

      InterfaceTextUtil.isCached().should.be.false();

      LocalStorageUtil.getItem.restore();
      InterfaceTextUtil.isExpired.restore();
    });

    it('should return true if object is save and time is not expired', () => {
      sinon.stub(LocalStorageUtil, 'getItem', key => {
        if (key == 'interfaceTexts') {
          return 'something';
        }
        return null;
      });
      sinon.stub(InterfaceTextUtil, 'isExpired', () => false);

      InterfaceTextUtil.isCached().should.be.true();

      LocalStorageUtil.getItem.restore();
      InterfaceTextUtil.isExpired.restore();
    });
  });

  describe('#getLocalStorageItem', () => {
    it('should return empty object if object is not saved', () => {
      sinon.stub(LocalStorageUtil, 'getItem', () => null);

      InterfaceTextUtil.getLocalStorageItem().should.be.eql({});

      LocalStorageUtil.getItem.restore();
    });

    it('should return saved object', () => {
      const interfaceText = {
        'key': 'value'
      };

      sinon.stub(LocalStorageUtil, 'getItem', key => {
        if (key == 'interfaceTexts') {
          return JSON.stringify(interfaceText);
        }
        return null;
      });

      InterfaceTextUtil.getLocalStorageItem().should.be.eql(interfaceText);

      LocalStorageUtil.getItem.restore();
    });
  });
});
