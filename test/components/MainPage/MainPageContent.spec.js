import React from 'react';
import { shallow } from 'enzyme';

import MainPageContent from 'components/MainPage/MainPageContent';
import Header from 'components/MainPage/MainPageContent/Header';


describe('<MainPageContent />', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPageContent />);
    wrapper.should.be.ok();
  });

  it('should render subcomponents', function () {
    let wrapper = shallow(<MainPageContent />);
    wrapper.find(Header).should.have.length(1);
  });

  it('should hide search description when searching', function () {
    let wrapper = shallow(<MainPageContent query='something not empty' />);
    wrapper.find('.search-description .hidden').should.have.length(1);

    wrapper = shallow(<MainPageContent query='' />);
    wrapper.find('.search-description .hidden').should.have.length(0);
  });
});
