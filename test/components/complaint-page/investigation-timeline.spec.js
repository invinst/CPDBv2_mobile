import React from 'react';
import { shallow } from 'enzyme';

import InvestigationTimeline from 'components/complaint-page/investigation-timeline';


describe('InvestigationTimeline component', function () {

  it('should render 3 date if given 3 different dates', function () {
    const wrapper = shallow(
      <InvestigationTimeline
        startDate='Dec 12, 2012'
        endDate='Dec 12, 2013'
        incidentDate='Dec 12, 2011'
      />
    );
    const texts = wrapper.find('.date');
    texts.length.should.eql(3);
    texts.at(0).text().should.eql('Dec 12, 2011');
    texts.at(1).text().should.eql('Dec 12, 2012');
    texts.at(2).text().should.eql('Dec 12, 2013');
  });

  it('should render 2 dates if 2 out of 3 dates are the same', function () {
    const wrapper = shallow(
      <InvestigationTimeline
        startDate='Dec 12, 2012'
        endDate='Dec 12, 2013'
        incidentDate='Dec 12, 2012'
      />
    );

    const texts = wrapper.find('.date');
    texts.length.should.eql(2);
    texts.at(0).text().should.eql('Dec 12, 2012');
    texts.at(1).text().should.eql('Dec 12, 2013');

    const wrapper2 = shallow(
      <InvestigationTimeline
        startDate='Dec 12, 2013'
        endDate='Dec 12, 2013'
        incidentDate='Dec 12, 2012'
      />
    );

    const texts2 = wrapper2.find('.date');
    texts2.length.should.eql(2);
    texts2.at(0).text().should.eql('Dec 12, 2012');
    texts2.at(1).text().should.eql('Dec 12, 2013');
  });

  it('should render 1 date if all of 3 dates are the same', function () {
    const wrapper = shallow(
      <InvestigationTimeline
        startDate='Dec 12, 2012'
        endDate='Dec 12, 2012'
        incidentDate='Dec 12, 2012'
      />
    );

    const texts = wrapper.find('.date');
    texts.length.should.eql(1);
    texts.at(0).text().should.eql('Dec 12, 2012');
  });

  it('should not render any date if not given any date', function () {
    const wrapper = shallow(
      <InvestigationTimeline />
    );

    wrapper.find('.date').length.should.eql(0);
  });
});
