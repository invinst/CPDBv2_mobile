import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';
import { Link } from 'react-router';
import { stub } from 'sinon';

import RelevantCoaccusalCard from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import StaticRadarChart from 'components/common/radar-chart';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


describe('<RelevantCoaccusalCard />', function () {
  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = shallow(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 11 }
        complaintCount={ 22 }
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
    plusButton.prop('darkMode').should.be.true();

    plusButton.simulate('click', { preventDefault: () => {} });

    addItemInPinboardPageStub.should.calledOnce();
    addItemInPinboardPageStub.should.calledWith({
      type: 'OFFICER',
      id: '123',
      complaintCount: 22,
      fullName: 'Jerome Finnigan',
      rank: 'Officer',
      percentile: {
        items: [
          { axis: 'Use of Force Reports', value: 20.6 },
          { axis: 'Internal Allegations', value: 10.1 },
          { axis: 'Civilian Allegations', value: 52.5 }
        ],
        officerId: 123,
        visualTokenBackground: '#ed7467',
        year: 2015
      }
    });
  });

  it('should render pluralize coaccusalCount and handle no percentile data', function () {
    const addItemInPinboardPageStub = stub();

    const wrapper = shallow(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
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

  it('should fade out when clicked on PlusButton', function () {
    const addItemInPinboardPageStub = stub();
    const preventDefaultStub = stub();

    const wrapper = mount(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
      />
    );

    const instance = wrapper.instance();
    const link = wrapper.find(Link);

    instance.state.fade.should.be.false();
    link.getDOMNode().className.should.not.containEql('fade-out');

    instance.handleClick({ preventDefault: preventDefaultStub });

    preventDefaultStub.should.be.calledOnce();
    instance.state.fade.should.be.true();
    addItemInPinboardPageStub.should.be.calledOnce();
    link.getDOMNode().className.should.containEql('fade-out');

    preventDefaultStub.resetHistory();
    addItemInPinboardPageStub.resetHistory();
    instance.handleClick({ preventDefault: preventDefaultStub });

    preventDefaultStub.should.be.calledOnce();
    instance.state.fade.should.be.true();
    addItemInPinboardPageStub.should.not.be.called();
  });
});
