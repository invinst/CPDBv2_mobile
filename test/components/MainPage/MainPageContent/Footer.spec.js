import React from 'react';
import { shallow } from 'enzyme';

import Footer from 'components/MainPage/MainPageContent/Footer';

describe('<Footer />', function () {
  it('should render', function () {
    let wrapper = shallow(<Footer />);
    wrapper.should.be.ok();
  });

  it('should be invisible if search bar is focused', () => {
    let wrapper = shallow(<Footer isSearchFocused={ true } />);
    wrapper.find('.footer .hidden').should.have.length(1);
  });

  it('should be visible if search bar is unfocused', () => {
    let wrapper = shallow(<Footer isSearchFocused={ false } />);
    wrapper.find('.footer .hidden').should.have.length(0);
  })
});
