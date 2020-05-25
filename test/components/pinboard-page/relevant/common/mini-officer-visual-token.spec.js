import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';

import MiniVisualToken from 'components/pinboard-page/relevant/common/mini-officer-visual-token';
import StaticRadarChart from 'components/common/radar-chart';

describe('<MiniVisualToken />', function () {
  it('should render enough content', function () {
    const percentile = {
      officerId: 1,
      items: [
        { axis: 'Use of Force Reports', value: 20.6 },
        { axis: 'Internal Allegations', value: 10.1 },
        { axis: 'Civilian Allegations', value: 52.5 },
      ],
      visualTokenBackground: '#ed7467',
      textColor: '#231F20',
    };
    const wrapper = shallow(
      <MiniVisualToken
        className='custom-class-name'
        percentile={ percentile }
      />
    );
    wrapper.prop('className').should.containEql('custom-class-name');

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('hideAxisText').should.be.true();
    radarChart.prop('showGrid').should.be.false();
    radarChart.prop('showSpineLine').should.be.false();
    radarChart.prop('backgroundColor').should.eql('#ed7467');
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 20.6 },
      { axis: 'Internal Allegations', value: 10.1 },
      { axis: 'Civilian Allegations', value: 52.5 },
    ]);
    radarChart.prop('width').should.eql(22);
    radarChart.prop('height').should.eql(22);
    radarChart.prop('radius').should.eql(10);
    radarChart.prop('yAxisCenter').should.eql(9);
  });

  it('should render handle missing data', function () {
    const wrapper = shallow(<MiniVisualToken/>);

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('hideAxisText').should.be.true();
    radarChart.prop('showGrid').should.be.false();
    radarChart.prop('showSpineLine').should.be.false();
    should(radarChart.prop('backgroundColor')).be.undefined();
    should(radarChart.prop('data')).be.undefined();
    radarChart.prop('width').should.eql(22);
    radarChart.prop('height').should.eql(22);
    radarChart.prop('radius').should.eql(10);
    radarChart.prop('yAxisCenter').should.eql(9);
  });
});
