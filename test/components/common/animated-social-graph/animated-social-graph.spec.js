import React from 'react';
import { mount } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';
import Slider from 'rc-slider';
import Autocomplete from 'react-autocomplete';
import should from 'should';

import AnimatedSocialGraph from 'components/common/animated-social-graph';
import SocialGraph from 'components/common/animated-social-graph/social-graph';



describe('AnimatedSocialGraph component', function () {
  let wrapper;
  const officers = [
    {
      fullName: 'Jerome Finnigan',
      id: 1
    },
    {
      fullName: 'Edward May',
      id: 2
    }
  ];
  const coaccusedData = [
    {
      officerId1: 1,
      officerId2: 2,
      incidentDate: '1988-10-03T00:00:00Z',
      accussedCount: 1,
    }
  ];
  const listEvent = [
    '1988-10-03 00:00:00+00:00',
    '1989-12-11 00:00:00+00:00',
    '1990-01-09 00:00:00+00:00',
    '1990-12-13 00:00:00+00:00',
    '1991-01-02 00:00:00+00:00',
    '1991-01-06 00:00:00+00:00',
    '1991-01-15 00:00:00+00:00',
    '1991-02-18 00:00:00+00:00',
    '1991-02-20 00:00:00+00:00',
    '1991-03-06 00:00:00+00:00'
  ];

  it('should render all sections correctly', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.find(SocialGraph).should.have.length(1);

    const slider = wrapper.find(Slider);
    const currentDate = wrapper.find('.current-date-label');
    wrapper.find('.start-date-label').text().should.equal('1988-10-03');
    wrapper.find('.end-date-label').text().should.equal('1991-03-06');
    currentDate.text().should.eql('1988-10-03');
    slider.prop('step').should.equal(1);
    slider.prop('min').should.equal(0);
    slider.prop('max').should.equal(9);
    slider.prop('defaultValue').should.equal(0);
    slider.prop('value').should.equal(0);

    wrapper.setState({ timelineIdx: 1 });
    currentDate.text().should.eql('1989-12-11');
    slider.prop('value').should.eql(1);

    const searchForm = wrapper.find(Autocomplete);
    searchForm.prop('items').should.equal(officers);
    searchForm.prop('inputProps').should.eql({ placeholder: 'Search', className: 'graph-search-input' });
    searchForm.prop('value').should.equal('');
    wrapper.setState({ searchInputText: 'Jerome Finnigan' });
    searchForm.prop('value').should.equal('Jerome Finnigan');
  });

  it('should not render graph control panel if there is no event', function () {
    wrapper = mount(<AnimatedSocialGraph/>);
    wrapper.find('.graph-control-panel').should.have.length(0);
    wrapper.find(Autocomplete).should.have.length(0);
  });

  it('should not render search form if there is no officer', function () {
    wrapper = mount(<AnimatedSocialGraph listEvent={ listEvent }/>);
    wrapper.find(Autocomplete).should.have.length(0);
  });

  it('should update clickSearchState value when click on search button', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const searchButton = wrapper.find('.graph-search-btn');
    searchButton.simulate('click');
    wrapper.state('clickSearchState').should.be.true();
  });

  it('should update searchInputText value when input new officer', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.state('searchInputText').should.equal('');
    const searchInput = wrapper.find(Autocomplete);
    searchInput.props().onChange({ target: { value: 'Jerome' } });
    wrapper.state('searchInputText').should.equal('Jerome');
  });

  it('should update searchInputText value when click on the result in suggestion list', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.state('searchInputText').should.equal('');
    const searchInput = wrapper.find(Autocomplete);
    searchInput.props().onSelect('Jerome Finnigan');
    wrapper.state('searchInputText').should.equal('Jerome Finnigan');
  });

  it('should call toggle timeline', function () {
    const clock = useFakeTimers();
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const toggleTimelineButton = wrapper.find('.toggle-timeline-btn');

    wrapper.state('refreshIntervalId').should.not.be.null();
    wrapper.state('timelineIdx').should.equal(0);
    clock.tick(150);
    wrapper.state('timelineIdx').should.equal(1);

    toggleTimelineButton.simulate('click');
    should(wrapper.state('refreshIntervalId')).be.null();
    wrapper.state('timelineIdx').should.equal(1);

    toggleTimelineButton.simulate('click');
    wrapper.state('refreshIntervalId').should.not.be.null();
    wrapper.state('timelineIdx').should.equal(1);

    clock.tick(1350);
    wrapper.state('timelineIdx').should.equal(9);
    should(wrapper.state('refreshIntervalId')).be.null();

    toggleTimelineButton.simulate('click');
    wrapper.state('timelineIdx').should.equal(0);
    wrapper.state('refreshIntervalId').should.not.be.null();
    clock.restore();
  });

  it('should update timelineIdx value when click on specific part of the timeline ', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    wrapper.state('timelineIdx').should.equal(0);
    const coaccusalsThresholdSlider = wrapper.find(Slider);
    coaccusalsThresholdSlider.props().onChange(5);
    wrapper.state('timelineIdx').should.equal(5);
  });

  it('should update refreshIntervalId and timelineIdx values when startTimelineFromBeginning', function () {
    const clock = useFakeTimers();
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const socialGraph = wrapper.find(SocialGraph);
    clock.tick(150);
    wrapper.state('timelineIdx').should.equal(1);
    const oldRefreshInterval = wrapper.state('refreshIntervalId');
    socialGraph.props().startTimelineFromBeginning();

    wrapper.state('timelineIdx').should.equal(0);
    wrapper.state('refreshIntervalId').should.not.be.null();
    wrapper.state('refreshIntervalId').should.not.eql(oldRefreshInterval);
    clock.restore();
  });

  it('should update refreshIntervalId value when stop timeline', function () {
    const clock = useFakeTimers();
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const socialGraph = wrapper.find(SocialGraph);

    clock.tick(150);
    wrapper.state('timelineIdx').should.equal(1);

    socialGraph.props().stopTimeline();
    should(wrapper.state('refreshIntervalId')).be.null();
    wrapper.state('timelineIdx').should.equal(1);
    clock.restore();
  });

  it('should render officer name with correct style', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const graphSearchInput = wrapper.find(Autocomplete);
    let renderItem = graphSearchInput.props().renderItem({ fullName: 'Jerome Finnigan', id: 123 }, true);
    renderItem.props.children.should.equal('Jerome Finnigan');
    renderItem.props.style.should.eql({ background: 'lightgray' });

    renderItem = graphSearchInput.props().renderItem({ fullName: 'Jerome Finnigan', id: 123 }, false);
    renderItem.props.children.should.equal('Jerome Finnigan');
    renderItem.props.style.should.eql({ background: 'white' });
  });

  it('should return render item render result for autocomplete', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const graphSearchInput = wrapper.find(Autocomplete);
    let shouldItemRenderResult = graphSearchInput.props().shouldItemRender(
      { fullName: 'Jerome Finnigan', id: 123 }
      , 'Jerome'
    );
    shouldItemRenderResult.should.be.true();

    shouldItemRenderResult = graphSearchInput.props().shouldItemRender(
      { fullName: 'Jerome Finnigan', id: 123 }
      , 'Tho'
    );
    shouldItemRenderResult.should.be.false();
  });

  it('should return item value for autocomplete', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const graphSearchInput = wrapper.find(Autocomplete);
    graphSearchInput.props().getItemValue({ fullName: 'Jerome Finnigan', id: 123 }).should.eql('Jerome Finnigan');
  });

  it('should call stopTimeline when componentWillUnmount', function () {
    wrapper = mount(
      <AnimatedSocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const instance = wrapper.instance();
    const stopTimelineSpy = spy(instance, 'stopTimeline');
    wrapper.unmount();
    stopTimelineSpy.called.should.be.true();
  });
});
