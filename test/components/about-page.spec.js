import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import AboutPage from 'components/about-page';

describe('<AboutPage />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<AboutPage />);
    wrapper.should.be.ok();
  });

  it('should not render anything if data is not loaded', () => {
    const wrapper = shallow(
      <AboutPage content={ null } />
    );
    should(wrapper.type()).equal(null);
  });

  it('should render content correctly', () => {
    const wrapper = shallow(
      <AboutPage content={ ['One', 'Two'] } />
    );

    wrapper.find('.sheet-body').text().should.eql('OneTwo');
  });

});
