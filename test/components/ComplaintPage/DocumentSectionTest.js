import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import should from 'should';

import f from 'utils/tests/f';
import shouldReact from 'utils/tests/should/React';

import DocumentSection from 'components/ComplaintPage/DocumentSection.react';
import DocumentCard from 'components/ComplaintPage/DocumentSection/DocumentCard.react';
import InterfaceTextResourceUtil from 'utils/InterfaceTextResourceUtil';


describe('DocumentSectionComponent', () => {
  let documentSection;

  beforeEach(() => {
    sinon.stub(InterfaceTextResourceUtil, 'get', () => {});
  });

  afterEach(() => {
    InterfaceTextResourceUtil.get.restore();
  });


  it('should be renderable', () => {
    DocumentSection.should.be.renderable();
  });

  it('should render nothing if there is no documents', () => {
    documentSection = ReactTestUtils.renderIntoDocument(
      <DocumentSection/>
    );
    documentSection.should.renderNothing();
  });

  it('should show number of documents', () => {
    let headerNode;
    const documents = f.createBatch(2, 'Document');
    documentSection = ReactTestUtils.renderIntoDocument(
      <DocumentSection documents={ documents } />
    );

    headerNode = ReactTestUtils.findRenderedDOMComponentWithClass(documentSection, 'section-title');
    headerNode.textContent.should.containEql('2');
  });

  it('should render list of DocumentCard', () => {
    const documents = f.createBatch(2, 'Document');

    documentSection = ReactTestUtils.renderIntoDocument(
      <DocumentSection documents={ documents } />
    );

    ReactTestUtils.scryRenderedComponentsWithType(documentSection, DocumentCard).length.should.be.equal(2);
  });

});
