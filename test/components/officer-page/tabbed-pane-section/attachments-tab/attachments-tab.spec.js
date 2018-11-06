import React from 'react';
import { shallow, mount } from 'enzyme';

import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';
import Complaint from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint';
import { stub } from 'sinon';


describe('AttachmentsTab component', function () {
  const attachment0 = {
    title: 'CRID 1071970 OCIR 2 of 3',
    url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-2-of-3.html',
    previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
    fileType: 'document',
  };
  const attachment1 = {
    title: 'Video Clip',
    url: 'https://player.vimeo.com/video/165206078',
    previewImageUrl: '/src/img/ic-video.svg',
    fileType: 'video',
  };
  const complaint0 = {
    crid: '307775',
    officerId: '12074',
    category: 'Use Of Force',
    finding: 'Not Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 1',
    coaccused: 4,
    attachments: [attachment0, attachment1],
  };
  const complaint1 = {
    crid: '307776',
    officerId: '12074',
    category: 'Use Of Force',
    finding: 'Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 2',
    coaccused: 2,
    attachments: [attachment0],
  };
  const complaints = [complaint0, complaint1];

  it('should render Complaints', function () {
    const wrapper = shallow(<AttachmentsTab complaints={ complaints }/>);
    const complaintComponents = wrapper.find(Complaint);

    complaintComponents.should.have.length(2);
    complaintComponents.at(0).prop('complaint').should.eql(complaint0);
    complaintComponents.at(1).prop('complaint').should.eql(complaint1);
  });

  it('should get officer timeline after the component is mounted', function () {
    const stubGetOfficerTimeline = stub();
    mount(<AttachmentsTab complaints={ [] } officerId={ 123 } getOfficerTimeline={ stubGetOfficerTimeline }/>);
    stubGetOfficerTimeline.calledWith(123).should.be.true();
  });
});
