import React from 'react';
import sinon from 'sinon';
import should from 'should';

import DeviceUtil from 'utils/DeviceUtil';
import f from 'utils/tests/f';
import DocumentPresenter from 'presenters/DocumentPresenter';
import DocumentFactory from 'factories/DocumentFactory';


describe('DocumentPresenter', () => {
  describe('#documentName', () => {
    it('should return document name based its type', () => {
      let document = f.create('Document', { 'type': 'CR' });
      DocumentPresenter(document).documentName.should.be.eql('Investigation report');

      document = f.create('Document', { 'type': 'CPB' });
      DocumentPresenter(document).documentName.should.be.eql('Police board hearing');

      document = f.create('Document', { 'type': '' });
      DocumentPresenter(document).documentName.should.be.eql('Unknown type');
    });
  });

  describe('#documentLink', () => {
    it('should return pdf link if device is iOS one', () => {
      const document = f.create('Document', { 'documentcloud_id': '12345', 'normalized_title': 'cr-12345' });
      const link = 'http://documentcloud.org/documents/12345-cr-12345.pdf';
      sinon.stub(DeviceUtil, 'isiOSDevice', () => true);

      DocumentPresenter(document).documentLink.should.be.equal(link);
      DeviceUtil.isiOSDevice.restore();
    });

    it('should return cloud link if device is not iOS one', () => {
      const document = f.create('Document', { 'documentcloud_id': '12345', 'normalized_title': 'cr-12345' });
      const link = 'http://documentcloud.org/documents/12345-cr-12345.html';
      sinon.stub(DeviceUtil, 'isiOSDevice', () => false);
      DocumentPresenter(document).documentLink.should.be.equal(link);
      DeviceUtil.isiOSDevice.restore();
    });
  });

  describe('#documentStatus', () => {
    it('should return document status based on its type', () => {
      let document = f.create('Document', { 'documentcloud_id': 'something' });
      DocumentPresenter(document).documentStatus.should.be.eql('Available');

      document = f.create('Document', { 'requested': true, 'documentcloud_id': '' });
      DocumentPresenter(document).documentStatus.should.be.eql('Pending');

      document = f.create('Document', { 'requested': false, 'documentcloud_id': '' });
      DocumentPresenter(document).documentStatus.should.be.eql('Missing');
    });
  });

  describe('#documentAction', () => {
    it('should return correct document action corresponding to its status', () => {
      let document = f.create('Document', { 'documentcloud_id': 'something' });
      DocumentPresenter(document).documentAction.should.be.eql('View');

      document = f.create('Document', { 'requested': true, 'documentcloud_id': '' });
      DocumentPresenter(document).documentAction.should.be.eql('Follow');

      document = f.create('Document', { 'requested': false, 'documentcloud_id': '' });
      DocumentPresenter(document).documentAction.should.be.eql('Request');
    });
  });
});
