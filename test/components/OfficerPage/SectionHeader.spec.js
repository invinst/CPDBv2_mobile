import React from 'react';
import { shallow } from 'enzyme';
import SectionHeader from 'components/OfficerPage/SectionHeader';


describe('<SectionHeader />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<SectionHeader />);
    wrapper.should.be.ok();
  });

  it('should render data', function () {
    const description = <div className='ho'>ho</div>;
    const wrapper = shallow(
      <SectionHeader
        text='Hey'
        description={ description }
      />
    );

    wrapper.text().should.containEql('Hey');
    wrapper.find('.ho').text().should.eql('ho');
  });

});
