import React from 'react';
import { shallow } from 'enzyme';

import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import RadarSpineLine from 'components/common/radar-chart/radar-spine-line';
import RadarGrid from 'components/common/radar-chart/radar-grid';


describe('RadarChart component', function () {
  const data = [
    {
      axis: 'A',
      value: 10,
    },
    {
      axis: 'B',
      value: 50,
    },
    {
      axis: 'C',
      value: 20,
    }
  ];

  it('should be renderable', () => {
    shallow(<RadarChart />).should.be.ok();
  });

  it('should render if default radar chart if data provided', () => {
    const wrapper = shallow(<RadarChart data={ data }/>);
    wrapper.find(RadarArea).exists().should.be.true();
    wrapper.find(RadarSpineLine).exists().should.be.true();
    wrapper.find('.radar-boundary-area').exists().should.be.true();
  });

  it('should show RadarAxis if there is data and showAxisTitle || showAxisValue', function () {
    let wrapper = shallow(<RadarChart data={ data } showAxisTitle={ true }/>);
    wrapper.find(RadarAxis).exists().should.be.true();

    wrapper = shallow(<RadarChart data={ data }/>);
    wrapper.find(RadarAxis).exists().should.be.false();

    wrapper = shallow(<RadarChart data={ data } showAxisValue={ true }/>);
    wrapper.find(RadarAxis).exists().should.be.true();
  });

  it('should render grid if showGrid is true', function () {
    const wrapper = shallow(<RadarChart data={ data } showGrid={ true }/>);
    wrapper.find(RadarGrid).exists().should.be.true();
  });

  it('should hide spline line if showSpineLine is set to false', function () {
    const wrapper = shallow(<RadarChart data={ data } showSpineLine={ false }/>);
    wrapper.find(RadarSpineLine).exists().should.be.false();
  });

  it('should render with the given aspect ratio config props', () => {
    const config = {
      width: 232,
      height: 100,
      radius: 164,
    };
    const wrapper = shallow(<RadarChart data={ data } { ...config } />);
    wrapper.prop('viewBox').should.eql('0 0 232 100');
  });

  it('should change background color backgroundColor is true ', () => {
    const wrapper = shallow(<RadarChart data={ data } backgroundColor='red'/>);

    wrapper.prop('style').backgroundColor.should.equal('red');
  });
});
