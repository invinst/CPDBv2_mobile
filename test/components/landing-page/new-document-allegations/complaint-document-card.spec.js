import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router';
import { stub } from 'sinon';
import { Router, Route, createMemoryHistory } from 'react-router';

import * as GATracking from 'utils/google_analytics_tracking';
import ComplaintDocumentCard from 'components/landing-page/new-document-allegations/complaint-document-card';


describe('<ComplaintDocumentCard />', () => {
  it('should render enough contents', () => {
    const allegation = {
      crid: '123',
      category: 'Operation/Personnel Violations',
      incidentDate: 'Jan 23, 2000',
      document: {
        previewImageUrl: 'https://assets.documentcloud.org/CRID-303350-CR-p1-normal.gif',
      }
    };

    const wrapper = shallow(<ComplaintDocumentCard allegation={ allegation } />);
    const element = wrapper.find(Link);
    element.prop('to').should.equal('/complaint/123/');
    element.find('.preview-image').prop('src').should.equal(
      'https://assets.documentcloud.org/CRID-303350-CR-p1-normal.gif'
    );
    element.find('.complaint-info-incident-date').text().should.equal('Jan 23, 2000');
    element.find('.complaint-info-category').text().should.equal('Operation/Personnel Violations');
  });

  it('should track click event', function () {
    const stubTrackAttachmentClick = stub(GATracking, 'trackAttachmentClick');
    const allegation = {
      'crid': '123456'
    };
    const complaintDocumentCard = () => (
      <ComplaintDocumentCard allegation={ allegation } pathname='/'/>
    );
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ complaintDocumentCard } />
      </Router>
    );
    wrapper.find('Link').simulate('click');
    stubTrackAttachmentClick.should.be.calledWith(
      '/',
      '/complaint/123456/'
    );
    stubTrackAttachmentClick.restore();
  });

  it('should track click on attachment event', function () {
    const stubOnTrackingAttachment = stub();
    const allegation ={
      'crid': '123456',
      'document': {
        'id': '654321'
      }
    };
    const complaintDocumentCard = () => (
      <ComplaintDocumentCard
        allegation={ allegation }
        pathname='/'
        onTrackingAttachment={ stubOnTrackingAttachment }
      />
    );
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
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