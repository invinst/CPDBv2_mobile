import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import should from 'should';

import DeviceUtil from 'utils/DeviceUtil';
import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';
import u from 'utils/HelperUtil';

import DocumentCard from 'components/ComplaintPage/DocumentSection/DocumentCard.react';
import Modal from 'components/Lib/Modal.react';
import InterfaceTextResourceUtil from 'utils/InterfaceTextResourceUtil';


describe('DocumentCardComponent', () => {
  beforeEach(() => {
    sinon.stub(InterfaceTextResourceUtil, 'get', () => {});
  });

  afterEach(() => {
    InterfaceTextResourceUtil.get.restore();
  });

  it('should be renderable', () => {
    DocumentCard.should.be.renderable();
  });

  it('should render document name', () => {
    const document = f.create('Document', { 'type': 'CR' });

    const documentCard = ReactTestUtils.renderIntoDocument(
      <DocumentCard document={ document } />
    );

    const documentNameNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'document-name');
    documentNameNode.textContent.should.containEql('Investigation report');
  });

  it('should render document status', () => {
    const document = f.create('Document', { 'documentcloud_id': 'something' });

    const documentCard = ReactTestUtils.renderIntoDocument(
      <DocumentCard document={ document } />
    );

    const documentStatusNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'status');
    documentStatusNode.textContent.should.containEql('Available');
  });

  it('should render request modal', () => {
    const document = f.create('Document', { 'documentcloud_id': 'something' });
    const modalName = u.format('requestModal-{id}', { 'id': document.id });
    const documentCard = ReactTestUtils.renderIntoDocument(
      <DocumentCard document={ document } />
    );

    documentCard.should.renderWithProps(Modal, { 'name': modalName });
  });

  describe('document name css', () => {
    it('should have blur css if the document is not available', () => {
      const document = f.create('Document', { 'documentcloud_id': '' });
      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document } />
      );

      const documentNameNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'document-name');

      documentNameNode.getAttribute('class').should.containEql('blur');
    });

    it('should not have blur css if the document is available', () => {
      const document = f.create('Document', { 'documentcloud_id': 'something' });
      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document } />
      );

      const documentNameNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'document-name');

      documentNameNode.getAttribute('class').should.not.containEql('blur');
    });
  });

  describe('Multiple document', () => {
    it('should show View action if the document is available', () => {
      const document = f.create('Document', { 'documentcloud_id': '12345', 'normalized_title': 'cr-123456' });
      const documentUrl = 'http://documentcloud.org/documents/12345-cr-123456.html';

      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document } />
      );

      const documentActionNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'action-type');
      documentActionNode.textContent.should.containEql('View');
      documentActionNode.getAttribute('href').should.containEql(documentUrl);
    });

    it('should show follow action if the document is requested but the document is still not available ', () => {
      const document = f.create('Document', { 'requested': true, 'documentcloud_id': '' });
      const modalName = u.format('requestModal-{id}', { 'id': document.id });
      const mock = sinon.mock(Modal.eventSystem);
      mock.expects('dispatch').once().withArgs(modalName, 'open');

      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document } />
      );
      const documentActionNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'action-type');

      ReactTestUtils.Simulate.click(documentActionNode);
      documentActionNode.textContent.should.containEql('Follow');

      mock.verify();
      mock.restore();
    });

    it('should show request action if the  document is still not available and not requested yet', () => {
      const document = f.create('Document', { 'requested': false, 'documentcloud_id': '' });
      const modalName = u.format('requestModal-{id}', { 'id': document.id });

      const mock = sinon.mock(Modal.eventSystem);
      mock.expects('dispatch').once().withArgs(modalName, 'open');

      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document } />
      );
      const documentActionNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'action-type');

      ReactTestUtils.Simulate.click(documentActionNode);
      documentActionNode.textContent.should.containEql('Request');

      mock.verify();
      mock.restore();
    });
  });

  describe('Document is available', () => {
    it('should show the link to html page of DocumentCloud if the current device is not iOS one', () => {
      const document = f.create('Document', { 'documentcloud_id': '12345', 'normalized_title': 'cr-123456' });
      const expectedLink = 'http://documentcloud.org/documents/12345-cr-123456.html';

      sinon.stub(DeviceUtil, 'isiOSDevice', () => false);
      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document }/>
      );
      const actionTypeNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'action-type');

      actionTypeNode.getAttribute('href').should.be.equal(expectedLink);
      DeviceUtil.isiOSDevice.restore();
    });

    it('should show the link to pdf page of DocumentCloud if the current device is iOS one', () => {
      const document = f.create('Document', { 'documentcloud_id': '12345', 'normalized_title': 'cr-123456' });
      const expectedLink = 'http://documentcloud.org/documents/12345-cr-123456.pdf';

      sinon.stub(DeviceUtil, 'isiOSDevice', () => true);
      const documentCard = ReactTestUtils.renderIntoDocument(
        <DocumentCard document={ document }/>
      );
      const actionTypeNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentCard, 'action-type');

      actionTypeNode.getAttribute('href').should.be.equal(expectedLink);
      DeviceUtil.isiOSDevice.restore();
    });
  });
});
