import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';


import * as tracking from 'utils/tracking';
import ComplaintDocumentCard from 'components/landing-page/new-document-allegations/complaint-document-card';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import constants from 'constants';


describe('<ComplaintDocumentCard />', function () {
  it('should render enough contents', function () {
    const addOrRemoveItemInPinboard = sinon.stub();
    const allegation = {
      crid: '123',
      category: 'Operation/Personnel Violations',
      incidentDate: 'Jan 23, 2000',
      document: {
        previewImageUrl: 'https://assets.documentcloud.org/CRID-303350-CR-p1-normal.gif',
      },
      isPinned: true,
    };

    const wrapper = shallow(
      <ComplaintDocumentCard allegation={ allegation } addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }/>
    );
    const element = wrapper.find(Link);
    element.prop('to').should.equal('/complaint/123/');
    element.find('.preview-image').prop('src').should.equal(
      'https://assets.documentcloud.org/CRID-303350-CR-p1-normal.gif'
    );
    element.find('.complaint-info-incident-date').text().should.equal('Jan 23, 2000');
    element.find('.complaint-info-category').text().should.equal('Operation/Personnel Violations');

    const itemPinButton = element.find(ItemPinButton);
    itemPinButton.props().className.should.eql(pinButtonStyles.cardPinnedButton);
    itemPinButton.props().addOrRemoveItemInPinboard.should.eql(addOrRemoveItemInPinboard);
    itemPinButton.props().showHint.should.be.false();
    itemPinButton.props().item.should.eql({
      type: constants.PINBOARD_PAGE.PINNED_ITEM_TYPES.CR,
      id: '123',
      isPinned: true,
    });
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = sinon.stub(tracking, 'trackAttachmentClick');
    const allegation = {
      'crid': '123456',
    };
    const complaintDocumentCard = () => (
      <ComplaintDocumentCard allegation={ allegation } pathname='/'/>
    );
    const wrapper = mount(
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={ complaintDocumentCard } />
      </Router>
    );
    wrapper.find('Link').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/',
      '/complaint/123456/'
    );
  });

  it('should track click on attachment event', function () {
    const stubOnTrackingAttachment = sinon.stub();
    const allegation ={
      'crid': '123456',
      'document': {
        'id': '654321',
      },
    };
    const complaintDocumentCard = () => (
      <ComplaintDocumentCard
        allegation={ allegation }
        pathname='/'
        onTrackingAttachment={ stubOnTrackingAttachment }
      />
    );
    const wrapper = mount(
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={ complaintDocumentCard } />
      </Router>
    );
    wrapper.find('Link').simulate('click');
    stubOnTrackingAttachment.should.be.calledWith({
      attachmentId: '654321',
      sourcePage: 'Landing Page',
      app: 'Mobile',
    });
  });
});
