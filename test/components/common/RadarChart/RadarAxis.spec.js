import React from 'react';
import { shallow } from 'enzyme';

import RadarAxis from 'components/common/RadarChart/RadarAxis';
import RadarAxisText from 'components/common/RadarChart/RadarAxis/RadarAxisText';


describe('RadarAxis component', function () {
  const data = [{
    axis: 'Use of Force Reports',
    value: 22.2,
  }, {
    axis: 'Civilian Complaints',
    value: 44.8,
  }, {
    axis: 'Internal Complaints',
    value: 99.28,
  }];

  it('should be renderable', () => {
    shallow(<RadarAxis />).should.be.ok();
  });

  it('should hide axis titles and values as default', function () {
    const wrapper = shallow(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
      />
    );

    wrapper.text().should.not.containEql('Use of Force');
    wrapper.text().should.not.containEql('Civilian');
    wrapper.text().should.not.containEql('Internal');
    wrapper.text().should.not.containEql('Complaints');

    const radarAxisText = wrapper.find(RadarAxisText);
    radarAxisText.exists().should.be.false();

    wrapper.find('.radar-boundary-area').exists().should.be.true();
  });

  it('should render pass showAxisValue to RadarAxisText', function () {
    const wrapper = shallow(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
        showAxisValue={ true }
      />
    );

    const radarAxisText = wrapper.find(RadarAxisText);
    radarAxisText.prop('showAxisTitle').should.be.false();
    radarAxisText.prop('showAxisValue').should.be.true();
  });

  it('should render showAxisTitle to RadarAxisText', function () {
    const wrapper = shallow(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
        showAxisTitle={ true }
      />
    );

    const radarAxisText = wrapper.find(RadarAxisText);
    radarAxisText.prop('showAxisTitle').should.be.true();
    radarAxisText.prop('showAxisValue').should.be.false();
  });
});
