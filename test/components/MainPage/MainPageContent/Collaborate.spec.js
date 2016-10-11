import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import Collaborate from 'components/MainPage/MainPageContent/Collaborate';

describe('<Collaborate />', function () {
  it('should render', function () {
    let wrapper = shallow(<Collaborate />);
    wrapper.should.be.ok();
  });

  it('should render collaborate questions', () => {
    const collaborateContent = f.createBatch(2, 'Collaborate');
    const collaborateSection = {
      collaborateHeader: 'Collaborate with us',
      collaborateContent: collaborateContent
    };

    let wrapper = shallow(<Collaborate collaborateSection={ collaborateSection }/>);
    wrapper.find('.collaborate .paragraph p').should.have.length(2);
  });

  it('should be invisible if search bar is focused', () => {
    let wrapper = shallow(<Collaborate isSearchFocused={ true } />);
    wrapper.find('.collaborate .hidden').should.have.length(1);
  });

  it('should be visible if search bar is unfocused', () => {
    let wrapper = shallow(<Collaborate isSearchFocused={ false } />);
    wrapper.find('.collaborate .hidden').should.have.length(0);
  })
});
