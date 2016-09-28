import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import About from 'components/MainPage/MainPageContent/About';

describe('<About />', function () {
  it('should render', function () {
    let wrapper = shallow(<About />);
    wrapper.should.be.ok();
  });

  it('should render about questions', () => {
    const aboutContent = f.createBatch(2, 'About');
    const aboutSection = {
      aboutHeader: 'About',
      aboutContent: aboutContent
    };

    let wrapper = shallow(<About aboutSection={ aboutSection }/>);
    wrapper.find('.about .paragraph p').should.have.length(2);
  });

  it('should be invisible if search bar is focused', () => {
    let wrapper = shallow(<About isSearchFocused={ true } />);
    wrapper.find('.about .hidden').should.have.length(1);
  });

  it('should be visible if search bar is unfocused', () => {
    let wrapper = shallow(<About isSearchFocused={ false } />);
    wrapper.find('.about .hidden').should.have.length(0);
  })
});
