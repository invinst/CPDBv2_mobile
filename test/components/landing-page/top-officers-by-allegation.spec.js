import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import { EditorState } from 'draft-js';

import { mountWithRouter } from 'utils/tests';
import TopOfficersByAllegation from 'components/landing-page/top-officers-by-allegation';
import OfficerCard from 'components/common/officer-card';
import CarouselWrapper from 'components/landing-page/carousel-wrapper';
import * as IntercomUtils from 'utils/intercom';


describe('<TopOfficersByAllegation />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<TopOfficersByAllegation />);
    wrapper.should.be.ok();
  });

  it('should call request TopOfficersByAllegation and CMS if they are not requested', function () {
    const requestTopOfficersByAllegationSpy = spy();
    const requestCMSSpy = spy();
    mountWithRouter(
      <TopOfficersByAllegation
        requestTopOfficersByAllegation={ requestTopOfficersByAllegationSpy }
        topOfficersByAllegation={ [{ id: 13788 }, { id: 13789 }] }
        cmsRequested={ true }
        requestCMS={ requestCMSSpy }
      />
    );
    requestTopOfficersByAllegationSpy.called.should.be.false();
    requestCMSSpy.called.should.be.false();

    requestTopOfficersByAllegationSpy.resetHistory();
    requestCMSSpy.resetHistory();
    mountWithRouter(
      <TopOfficersByAllegation
        requestTopOfficersByAllegation={ requestTopOfficersByAllegationSpy }
        requestCMS={ requestCMSSpy }
      />
    );
    requestTopOfficersByAllegationSpy.called.should.be.true();
    requestCMSSpy.called.should.be.true();
  });

  it('should render enough content', function () {
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();
    const topOfficersByAllegation = [
      {
        'full_name': 'Broderick Jones',
        gender: 'Male',
        id: 13788,
      },
      {
        'full_name': 'Queen Jones',
        gender: 'Female',
        id: 13789,
      },
    ];

    const wrapper = shallow(
      <TopOfficersByAllegation
        topOfficersByAllegation={ topOfficersByAllegation }
        cmsRequested={ true }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
        pinnable={ true }
      />
    );
    const carouselWrapper = wrapper.find(CarouselWrapper);
    carouselWrapper.prop('title').should.equal(titleCMSContent);
    carouselWrapper.prop('description').should.equal(descriptionCMSContent);

    const officers = wrapper.find(OfficerCard);
    officers.should.have.length(2);

    const firstOfficer = officers.at(0);
    const secondOfficer = officers.at(1);

    firstOfficer.prop('officer').should.eql({
      'full_name': 'Broderick Jones',
      gender: 'Male',
      id: 13788,
    });
    firstOfficer.prop('openCardInNewPage').should.be.false();
    firstOfficer.prop('pinnable').should.be.true();

    secondOfficer.prop('officer').should.eql({
      'full_name': 'Queen Jones',
      gender: 'Female',
      id: 13789,
    });
    firstOfficer.prop('openCardInNewPage').should.be.false();
    secondOfficer.prop('pinnable').should.be.true();
  });

  it('should not open intercom when running in embed mode', function () {
    const titleCMSContent = EditorState.createEmpty();
    const descriptionCMSContent = EditorState.createEmpty();
    const topOfficersByAllegation = [
      {
        'birth_year': 1971,
        'complaint_count': 104,
        'complaint_percentile': 99.9911,
        'full_name': 'Broderick Jones',
        gender: 'Male',
        id: 13788,
        percentile: {
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Internal Allegations', value: 87.828 },
            { axis: 'Civilian Allegations', value: 99.9817 },
          ],
          textColor: '#231F20',
          visualTokenBackground: '#f95125',
          year: 2005,
        },
        race: 'Black',
        'sustained_count': 11,
      },
    ];
    stub(IntercomUtils, 'showIntercomLauncher');

    const wrapper = shallow(
      <TopOfficersByAllegation
        topOfficersByAllegation={ topOfficersByAllegation }
        cmsRequested={ true }
        title={ titleCMSContent }
        description={ descriptionCMSContent }
        embed={ true }
      />
    );

    wrapper.find(OfficerCard).prop('openCardInNewPage').should.be.true();

    IntercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
    IntercomUtils.showIntercomLauncher.reset();

    wrapper.unmount();
    IntercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
  });
});
