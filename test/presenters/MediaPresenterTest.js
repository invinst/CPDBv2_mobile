import 'should';
import sinon from 'sinon';

import DeviceUtil from 'utils/DeviceUtil';
import f from 'utils/tests/f';
import 'factories/MediaFactory';
import MediaPresenter  from 'presenters/MediaPresenter'


describe('MediaPresenter', () => {
  describe('#url', () => {
    it('should return pdf link if device is iOS one if it is documentcloud document', () => {
      const media = f.create('Media', {
        'additional_info': {'documentcloud_id': '12345', 'normalized_title': 'cr-12345'},
        'type': 'document'
      });
      const link = 'http://documentcloud.org/documents/12345-cr-12345.pdf';
      sinon.stub(DeviceUtil, 'isiOSDevice', () => { return true; });

      MediaPresenter(media).url.should.be.equal(link);
      DeviceUtil.isiOSDevice.restore();
    });

    it('should return cloud link if device is not iOS one if it is documentcloud document', () => {
      const media = f.create('Media', {
        'additional_info': {'documentcloud_id': '12345', 'normalized_title': 'cr-12345'},
        'type': 'document'
      });
      const link = 'http://documentcloud.org/documents/12345-cr-12345.html';
      sinon.stub(DeviceUtil, 'isiOSDevice', () => { return false; });
      MediaPresenter(media).url.should.be.equal(link);
      DeviceUtil.isiOSDevice.restore();
    });

    it('should return url attribute value if it is not documentcloud document', () => {
      const media = f.create('Media', {'type': 'document', 'url': 'url'});
      MediaPresenter(media).url.should.be.equal('url');
    });
  });
});
