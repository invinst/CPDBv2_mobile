import React from 'react';
import { shallow } from 'enzyme';
import UnitChangeItem from 'components/OfficerPage/OfficerTimeline/UnitChangeItem';


describe('<UnitChangeItem />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<UnitChangeItem />);
    wrapper.should.be.ok();
  });

  it('should render data', function () {
    const wrapper = shallow(
      <UnitChangeItem
        date='Jun 02, 2012'
        unitName='54321'
      />
    );

    const text = wrapper.text();
    text.should.containEql('Unit Change');
    text.should.containEql('Jun 02, 2012');
    text.should.containEql('Assigned to Unit 54321');
  });

});
