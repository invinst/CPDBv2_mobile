import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';
import { Link } from 'react-router';
import { stub } from 'sinon';

import RelevantCoaccusalCard from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import StaticRadarChart from 'components/common/radar-chart';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('<RelevantCoaccusalCard />', function () {
  it('should render enough content correctly', function () {
    const addItemToPinboardStub = stub();

    const wrapper = shallow(
      <RelevantCoaccusalCard
        addItemToPinboard={ addItemToPinboardStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 11 }
        percentile={ {
          officerId: 123,
          year: 2015,
          items: [
            { axis: 'Use of Force Reports', value: 20.6, },
            { axis: 'Internal Allegations', value: 10.1, },
            { axis: 'Civilian Allegations', value: 52.5, },
          ],
          visualTokenBackground: '#ed7467',
        } }
      />
    );

    const link = wrapper.find(Link);
    link.prop('to').should.eql('/officer/123/jerome-finnigan/');

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 20.6, },
      { axis: 'Internal Allegations', value: 10.1, },
      { axis: 'Civilian Allegations', value: 52.5, },
    ]);
    radarChart.prop('width').should.eql(148);
    radarChart.prop('height').should.eql(60);
    radarChart.prop('radius').should.eql(28);
    radarChart.prop('offsetTop').should.eql(2);
    radarChart.prop('backgroundColor').should.eql('#ed7467');

    wrapper.find('.officer-card-rank').text().should.eql('Officer');
    wrapper.find('.officer-card-name').text().should.eql('Jerome Finnigan');
    wrapper.find('.coaccusal-count').text().should.eql('11 coaccusals');

    const plusButton = wrapper.find(PlusButton);
    plusButton.simulate('click', { preventDefault: () => {} });

    addItemToPinboardStub.should.calledOnce();
    addItemToPinboardStub.should.calledWith({ type: 'OFFICER', id: '123', isPinned: false });
  });

  it('should render pluralize coaccusalCount and handle no percentile data', function () {
    const addItemToPinboardStub = stub();

    const wrapper = shallow(
      <RelevantCoaccusalCard
        addItemToPinboard={ addItemToPinboardStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
      />
    );

    const link = wrapper.find(Link);
    link.prop('to').should.eql('/officer/123/jerome-finnigan/');

    const radarChart = wrapper.find(StaticRadarChart);
    should(radarChart.props.data).be.undefined();
    radarChart.prop('width').should.eql(148);
    radarChart.prop('height').should.eql(60);
    radarChart.prop('radius').should.eql(28);
    radarChart.prop('offsetTop').should.eql(2);
    should(radarChart.props.backgroundColor).be.undefined();

    wrapper.find('.officer-card-rank').text().should.eql('Officer');
    wrapper.find('.officer-card-name').text().should.eql('Jerome Finnigan');
    wrapper.find('.coaccusal-count').text().should.eql('1 coaccusal');
  });
});
