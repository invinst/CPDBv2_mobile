import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import AboutPage from 'components/about-page';
import Footer from 'components/footer';

describe('<AboutPage />', function () {
  it('should not render anything if data is not loaded', function () {
    const wrapper = shallow(
      <AboutPage content={ null } />
    );
    should(wrapper.type()).equal(null);
  });

  it('should render content correctly', function () {
    const wrapper = shallow(
      <AboutPage content={ ['One', 'Two'] } />
    );

    wrapper.find('.sheet-body').text().should.eql('OneTwo');
    wrapper.find(Footer).exists.should.be.ok();
  });

});
