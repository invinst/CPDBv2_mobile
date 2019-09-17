import React from 'react';
import { shallow } from 'enzyme';

import IOSPeek from 'components/common/ios-peek';


describe('<IOSPeek />', function () {
  it('should render correctly at top', function () {
    const wrapper = shallow(<IOSPeek className='custom-ios-peek-classname' />);

    const content = wrapper.find('div');
    content.prop('className').should.containEql('custom-ios-peek-classname').and.not.containEql('bottom');
  });

  it('should render correctly at bottom', function () {
    const wrapper = shallow(<IOSPeek isBottom={ true }/>);

    const content = wrapper.find('div');
    content.prop('className').should.not.containEql('custom-ios-peek-classname').and.containEql('bottom');
  });
});
