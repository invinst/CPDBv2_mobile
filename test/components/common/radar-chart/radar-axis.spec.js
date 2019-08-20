import React from 'react';
import { shallow } from 'enzyme';

import RadarAxis from 'components/common/radar-chart/radar-axis';


describe('RadarAxis component', function () {
  it('should draw 3 lines if have 3 axis titles', function () {
    const data = [
      {
        axis: 'a',
        value: 10,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const titles = wrapper.find('.radar-axis-title');

    titles.at(0).text().should.be.eql('a');
    titles.at(1).text().should.be.eql('b');
    titles.at(2).text().should.be.eql('c');
  });

  it('should show the last word in a new line if the title contains 2 words or more', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 10,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisTitle={ true }/>
    );

    const axisTexts = wrapper.find('text');

    const lines = axisTexts.at(0).find('tspan');
    lines.should.have.length(2);
    lines.at(0).text().should.be.eql('Title is');
    lines.at(1).text().should.be.eql('1');

    axisTexts.at(1).find('tspan').text().should.equal('b');
  });

  it('should show axis values if showAxisValue is true', function () {
    const data = [
      {
        axis: 'Title is 1',
        value: 10,
      },
      {
        axis: 'b',
        value: 50,
      },
      {
        axis: 'c',
        value: 20,
      },
    ];
    const wrapper = shallow(
      <RadarAxis radius={ 100 } data={ data } showAxisValue={ true }/>
    );

    const values = wrapper.find('.radar-axis-value');
    values.should.have.length(3);
    values.at(0).text().should.be.eql('10');
    values.at(1).text().should.be.eql('50');
    values.at(2).text().should.be.eql('20');
  });
});
