import DeviceUtil from 'utils/DeviceUtil';
import sinon from 'sinon';

import should from 'should';


describe('DeviceUtil', () => {
  it('should return true if it is iDevices', () => {
    sinon.stub(DeviceUtil, 'getUserAgent', () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) ' +
    'AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4');

    DeviceUtil.isiOSDevice().should.be.equal(true);

    DeviceUtil.getUserAgent.restore();
  });

  it('should return false if it is iDevices', () => {
    sinon.stub(DeviceUtil, 'getUserAgent', () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36');

    DeviceUtil.isiOSDevice().should.be.equal(false);

    DeviceUtil.getUserAgent.restore();
  });
});

