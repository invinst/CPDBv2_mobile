import React from 'react';
import { shallow } from 'enzyme';

import SectionHeader from 'components/officer-page/section-header';


describe('<SectionHeader />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(<SectionHeader />);
    wrapper.should.be.ok();
  });

  it('should render data', function () {
    const text = <div className='hey'>Hey</div>;
    const wrapper = shallow(
      <SectionHeader
        text={ text }
      />
    );

    wrapper.text().should.containEql('Hey');
  });

});
