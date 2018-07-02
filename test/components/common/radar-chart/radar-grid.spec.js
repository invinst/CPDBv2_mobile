import React from 'react';
import { shallow } from 'enzyme';

import RadarGrid from 'components/common/radar-chart/radar-grid';


describe('RadarGrid component', function () {

  it('should be renderable', () => {
    shallow(<RadarGrid />).should.be.ok();
  });

  it('should render 5 small triangles', function () {
    const wrapper = shallow(
      <RadarGrid radius={ 100 } numAxis={ 3 } maxValue={ 100 } strokeWidth={ 1 }/>
    );

    wrapper.find('path').should.have.length(5);
  });
});
