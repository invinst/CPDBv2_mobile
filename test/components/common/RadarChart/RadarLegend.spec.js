import React from 'react';
import { shallow, mount } from 'enzyme';
import { Motion } from 'react-motion';
import should from 'should';

import RadarLegend from 'components/common/RadarChart/RadarLegend';


describe('RadarLegend component', function () {

  it('should display nothing if no content provided', () => {
    const wrapper = shallow(<RadarLegend/>);
    should(wrapper.type()).be.null();
  });

  it('should render if text is defined', () => {
    const wrapper = shallow(<RadarLegend content='legend text'/>);

    wrapper.find('text').text().should.containEql('legend text');
  });

  it('should render Motion if fadeOut is true', (done) => {
    this.timeout(5000);
    const wrapper = mount(
      <RadarLegend content='2017' fadeOut={ true }/>
    );
    wrapper.find(Motion).exists().should.be.true();
    wrapper.find('text').text().should.be.eql('2017');

    setTimeout(function () {
      const legendYearElement = wrapper.find('text');
      legendYearElement.text().should.be.eql('2017');
      legendYearElement.prop('style').visibility.should.equal('hidden');
      done();
    }, 1500);
  });
});
