import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Attachments from 'components/complaint-page/attachments';

describe('Attachments component', function () {
  it('should render header', function () {
    let instance = shallow(
      <Attachments attachments={ [] } />
    );

    instance.find('.label').text().should.eql('There are no documents that have been made public yet.');

    instance = shallow(
      <Attachments attachments={ ['abc'] } />
    );

    instance.find('.label').text().should.eql('ATTACHMENTS');
  });

  it('should call requestDocument when click on request button', function () {
    const requestDocumentSpy = spy();
    const instance = shallow(
      <Attachments requestDocument={ requestDocumentSpy } />
    );

    instance.find('.request-document-button').simulate('click');
    requestDocumentSpy.called.should.be.true();
  });

  it('should not call requestDocument if already requested', function () {
    const requestDocumentSpy = spy();
    const instance = shallow(
      <Attachments
        requestDocument={ requestDocumentSpy }
        alreadyRequested={ true } />
    );

    const requestButton = instance.find('.request-document-button');
    requestButton.simulate('click');
    requestButton.text().should.eql('Documents Requested   ✔');
    requestDocumentSpy.called.should.be.false();
  });
});
