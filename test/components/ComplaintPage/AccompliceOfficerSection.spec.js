import React from 'react';
import { mount, shallow } from 'enzyme';
import { mock, match } from 'sinon';

import f from 'utils/tests/f';
import AccompliceOfficerSection from 'components/ComplaintPage/AccompliceOfficerSection';
import AppHistory from 'utils/History';
import OfficerCard from 'components/Shared/OfficerCard';


describe('AccompliceOfficerSection component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<AccompliceOfficerSection />);
    wrapper.should.be.ok();
  });

  it('should render OfficerCard for each officer in officerAllegations', function () {
    const officerAllegations = f.createBatch(2, 'OfficerAllegation');
    const wrapper = shallow(<AccompliceOfficerSection officerAllegations={ officerAllegations }/>);
    wrapper.find(OfficerCard).should.have.length(2);
  });

  it('should push history on clicking OfficerCard', function () {
    const mockAppHistory = mock(AppHistory);
    const officerAllegation = f.create('OfficerAllegation');

    mockAppHistory.expects('push').once().withArgs(match.any).returns('anything');
    const wrapper = mount(
      <AccompliceOfficerSection officerAllegations={ [officerAllegation] }/>
    );
    wrapper.find('.officer-list > div').first().simulate('click');
    mockAppHistory.verify();
    mockAppHistory.restore();
  });
});
