import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import PercentileExplainer from 'components/officer-page/radar-chart/explainer/percentile-explainer';
import ExplainerLayout from 'components/officer-page/radar-chart/explainer/explainer-layout';
import StaticRadarChart from 'components/common/radar-chart';


describe('PercentileExplainer component', function () {
  const data = [{
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ],
    textColor: 'black',
    visualTokenBackground: 'black'
  }, {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white'
  }];


  it('should render enough content', function () {
    const closeExplainerSpy = spy();
    const leftNavHandlerSpy = spy();
    const rightNavHandlerSpy = spy();

    const wrapper = mount(
      <PercentileExplainer
        data={ data }
        closeExplainer={ closeExplainerSpy }
        leftNavHandler={ leftNavHandlerSpy }
        rightNavHandler={ rightNavHandlerSpy }
      />
    );

    const layout = wrapper.find(ExplainerLayout);

    layout.prop('radarChartConfig').should.deepEqual({
      data: [
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: 60 },
      ],
      backgroundColor: 'white',
      showSpineLine: false,
      showGrid: true,
      gridOpacity: 0.5,
      showAxisValue: true,
      radius: 141,
      axisTitleFontSize: 25,
      axisTitleFontWeight: 200,
      textColor: 'white',
      gridColor: '#adadad',
      yAxisCenter: 155,
      areaColor: '#000000',
    });
    layout.prop('leftNavigationText').should.equal('What is the scale?');
    layout.prop('rightNavigationText').should.equal('What is this triangle?');
    layout.prop('leftNavHandler').should.equal(leftNavHandlerSpy);
    layout.prop('rightNavHandler').should.equal(rightNavHandlerSpy);
    layout.prop('title').should.equal('Cumulative Percentiles by Year');
    layout.prop('closeExplainer').should.equal(closeExplainerSpy);

    const headerCells = wrapper.find('.header-cell');
    headerCells.should.have.length(3);

    headerCells.at(0).text().should.equal('Internal Complaints');
    headerCells.at(1).text().should.equal('Civilian Complaints');
    headerCells.at(2).text().should.equal('Use Of Force');

    const percentileTable = wrapper.find('.percentile-table');
    const percentileRows = percentileTable.find('.percentiles-row');

    percentileRows.should.have.length(2);

    const firstRow = percentileRows.at(0);
    const secondRow = percentileRows.at(1);

    const firstRowRadarChart = firstRow.find(StaticRadarChart);
    firstRowRadarChart.prop('hideAxisText').should.be.true();
    firstRowRadarChart.prop('showGrid').should.be.false();
    firstRowRadarChart.prop('showSpineLine').should.be.false();
    firstRowRadarChart.prop('backgroundColor').should.equal('white');
    firstRowRadarChart.prop('data').should.deepEqual([
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ]);

    const secondRowRadarChart = secondRow.find(StaticRadarChart);
    secondRowRadarChart.prop('hideAxisText').should.be.true();
    secondRowRadarChart.prop('showGrid').should.be.false();
    secondRowRadarChart.prop('showSpineLine').should.be.false();
    secondRowRadarChart.prop('backgroundColor').should.equal('black');
    secondRowRadarChart.prop('data').should.deepEqual([
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ]);
  });
});
