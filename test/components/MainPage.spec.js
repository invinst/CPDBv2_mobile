import React from 'react';
import { shallow } from 'enzyme';

import MainPage from 'components/MainPage';
import MainPageContentContainer from 'containers/MainPage/MainPageContentContainer';


describe('MainPage component', function () {
  it('should render', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.should.be.ok();
  });

  it('should render MainPageContentContainer as subcomponents', function () {
    let wrapper = shallow(<MainPage />);
    wrapper.find(MainPageContentContainer).should.have.length(1);
  });
});
