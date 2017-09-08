import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import GaUtil from 'utils/GaUtil';
import OfficerTimeline from 'components/OfficerPage/OfficerTimeline';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';
import NavbarContainer from 'containers/NavbarContainer';
import constants from 'constants';


describe('<OfficerTimeline />', function () {

  beforeEach(function () {
    this.stubTrack = stub(GaUtil, 'track');
  });

  afterEach(function () {
    this.stubTrack.restore();
  });

  it('should be renderable', function () {
    const wrapper = shallow(<OfficerTimeline />);
    wrapper.should.be.ok();
  });

  it('should send GA event', function () {
    const wrapper = shallow(
      <OfficerTimeline
        getOfficerTimeline={ () => {} }
        getOfficerSummary={ () => {} }
      />
    );
    wrapper.instance().componentDidMount();

    this.stubTrack.calledWith('event', 'officer', 'view_detail', window.location.pathname).should.be.true();
  });

  it('should getOfficerTimeline on mount if not available yet', function () {
    const spyGetOfficerTimeline = spy();

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 11 }
        getOfficerTimeline={ spyGetOfficerTimeline }
        getOfficerSummary={ () => {} }
      />
    );
    wrapper.instance().componentDidMount();

    spyGetOfficerTimeline.calledWith(11).should.be.true();
  });

  it('should getOfficerSummary on mount if not available yet', function () {
    const spyGetOfficerSummary = spy();

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        getOfficerTimeline={ () => {} }
        getOfficerSummary={ spyGetOfficerSummary }
      />
    );
    wrapper.instance().componentDidMount();

    spyGetOfficerSummary.calledWith(12).should.be.true();
  });

  it('should render NotMatchedOfficerPage if officer is not found', function () {
    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ false }
      />
    );

    wrapper.type().should.be.eql(NotMatchedOfficerPage);
    wrapper.prop('id').should.be.eql(12);
  });

  it('should render header with officer name', function () {
    const summary = {
      name: 'Foo Bar'
    };
    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        summary={ summary }
      />
    );

    wrapper.find('.header').text().should.be.eql('Foo Bar');
  });

  it('should render Navbar', function () {
    const wrapper = shallow(<OfficerTimeline found={ true } />);
    wrapper.find(NavbarContainer).prop('backLink').should.eql(constants.SEARCH_PATH);
  });

  it('should render empty header if officer summary has not been fetched yet', function () {
    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        summary={ null }
      />
    );

    wrapper.find('.header').text().should.be.eql('');
  });

  it('should render CRItem', function () {
    const timeline = {
      results: [
        {
          kind: 'CR',
          foo: 'bar'
        }
      ]
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const crItem = wrapper.find('CRItem');
    crItem.prop('result').should.eql({ kind: 'CR', foo: 'bar' });
  });

  it('should render Unit Change item', function () {
    const timeline = {
      results: [
        {
          kind: 'UNIT_CHANGE',
          date: 'Jun 01, 2011',
          'unit_name': '12345'
        }
      ]
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const unitChangeItem = wrapper.find('SimpleEventItem');
    unitChangeItem.prop('date').should.eql('Jun 01, 2011');
    unitChangeItem.prop('title').should.eql('Unit Change');
    unitChangeItem.prop('content').should.eql('Assigned to Unit 12345');
  });

  it('should render Joined item', function () {
    const timeline = {
      results: [
        {
          kind: 'JOINED',
          date: 'Jun 01, 2111',
          'unit_name': '12345'
        }
      ]
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const item = wrapper.find('SimpleEventItem');
    item.prop('date').should.eql('Jun 01, 2111');
    item.prop('title').should.eql('Joined CPD');
  });

  it('should render YearlyStats item', function () {
    const timeline = {
      results: [
        {
          kind: 'YEAR',
          year: 2017,
          crs: 2,
          trrs: 3,
          salary: '$111'
        }
      ]
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const item = wrapper.find('YearlyStats');
    item.prop('year').should.eql(2017);
    item.prop('crCount').should.eql(2);
    item.prop('trrCount').should.eql(3);
    item.prop('salary').should.eql('$111');

  });

  it('should have body inside <InfiniteScroll>', function () {
    const timeline = {
      results: []
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const infiniteScroll = wrapper.find('InfiniteScroll');
    infiniteScroll.find('OfficerTopLinks').exists().should.be.true();
    infiniteScroll.find('.officer-timeline-body').exists().should.be.true();
  });

  it('should load more timeline items when scrolled to bottom', function () {
    const timeline = {
      next: '/next-url/',
      results: []
    };

    const spyGetMore = spy();

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        getMoreOfficerTimeline={ spyGetMore }
        summary={ {} }
      />
    );

    const infiniteScroll = wrapper.find('InfiniteScroll');
    infiniteScroll.prop('loadMore')();
    spyGetMore.calledWith(12, '/next-url/').should.be.true();
  });
});
