import React from 'react';
import { mount } from 'enzyme';

import Marker from 'components/officer-page/tabbed-pane-section/map/marker';


describe('Marker component', function () {
  let wrapper;

  it('should render marker component', function () {
    wrapper = mount(<Marker id={ '123' } kind={ 'CR' } finding={ 'Sustained' }/>);
    wrapper.find('.test--marker').should.have.length(1);
  });
});
