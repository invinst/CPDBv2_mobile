import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import { isEqual } from 'lodash';

import ReportingPage from 'components/ReportingPage';

describe('<ReportingPage />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<ReportingPage pagination={ { loaded: true } } />);
    wrapper.should.be.ok();
  });

  it('should not render anything if data is not loaded', () => {
    const paginationProp = {
      loaded: false
    };
    const wrapper = shallow(
      <ReportingPage
        pagination={ paginationProp }
        loadMore={ () => null } />
    );
    should(wrapper.type()).equal(null);
  });

  it('should start loading data on mount if not already loaded', () => {
    const paginationProp = {
      loaded: false
    };
    const loadMoreProp = spy();

    shallow(
      <ReportingPage
        pagination={ paginationProp }
        loadMore={ loadMoreProp } />
    );
    loadMoreProp.called.should.be.true();
  });

  it('should render "Reporting" header if has children', () => {
    const paginationProp = {
      loaded: true
    };

    const wrapper = shallow(
      <ReportingPage
        pagination={ paginationProp }
        loadMore={ () => {} }>
        foobar
      </ReportingPage>
    );

    wrapper.equals(<div>Reporting</div>).should.be.true();
  });

  it('should render infinite scrolling report list if not having children', () => {
    const paginationProp = {
      loaded: true
    };

    const wrapper = shallow(
      <ReportingPage
        pagination={ paginationProp }
        loadMore={ () => {} }
        hasMore={ false } />
    );

    wrapper.find('.sheet-header').text().should.equal('Reporting');
    wrapper.find('.sheet-body').find('InfiniteScroll').exists().should.be.true();
  });

  it('should render InfiniteScroll with correct props', () => {
    const paginationProp = {
      loaded: true,
      reports: ['foo', 'bar']
    };

    const loadMoreProp = spy();

    const stubRenderReportingItems = stub(ReportingPage.prototype, 'renderReportingItems')
      .callsFake((reports) => {
        if (isEqual(reports, ['foo', 'bar'])) {
          return 'foobar';
        }
      });

    const wrapper = shallow(
      <ReportingPage
        pagination={ paginationProp }
        loadMore={ loadMoreProp } />
    );

    const infiniteScroll = wrapper.find('.sheet-body').find('InfiniteScroll');
    infiniteScroll.prop('hasMore').should.be.false();
    infiniteScroll.contains('foobar').should.be.true();

    infiniteScroll.prop('loadMore')();
    loadMoreProp.calledOnce.should.be.true();

    stubRenderReportingItems.restore();
  });

  it('should render reporting items correctly', () => {
    const paginationProp = {
      loaded: true,
      reports: [{
        id: 1,
        publication: 'Washington Post',
        publishDate: 'Feb 31, 2017',
        title: ['A', 'Title']
      }]
    };

    const wrapper = shallow(
      <ReportingPage
        pagination={ paginationProp }
        loadMore={ () => {} } />
    );

    const reportingItems = wrapper.find('.sheet-body').find('InfiniteScroll').children();
    reportingItems.length.should.equal(1);

    const item = reportingItems.at(0);
    item.find('.reporting-item-row').exists().should.be.true();
    item.find('.publication').text().should.eql('Washington Post');
    item.find('.publish-date').text().should.eql('Feb 31, 2017');
    item.find('.title').text().should.eql('A. Title');
  });
});
