import should from 'should'; // eslint-disable-line no-unused-vars
import React from 'react';
import { shallow } from 'enzyme';

import SummaryStatsSection from 'components/OfficerPage/SummaryStatsSection';


describe('SummaryStatsSection component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(
      <SummaryStatsSection
        data={ { facets: [] } }
      />
    );
    wrapper.should.be.ok();
  });

  it('should render facets', function () {
    const data = {
      facets: [
        {
          name: 'Dummy Facet',
          entries: [
            {
              count: 99,
              'sustained_count': 1,
              name: 'Dummy Entry'
            }
          ]
        }
      ]
    };
    const wrapper = shallow(
      <SummaryStatsSection
        data={ data }
      />
    );

    const facet = wrapper.find('.facet');
    facet.find('.facet-name').text().should.be.eql('Dummy Facet');
    facet.find('.facet-entry-name').text().should.be.eql('Dummy Entry');
    facet.find('.facet-entry-count').at(0).text().should.be.eql('99');
    facet.find('.facet-entry-count.sustained').text().should.be.eql('1');
  });

  it('should not render facet header if `entries` is empty', function () {
    const data = {
      facets: [
        {
          name: 'Empty Facet',
          entries: []
        }
      ]
    };
    const wrapper = shallow(
      <SummaryStatsSection
        data={ data }
      />
    );

    const facet = wrapper.find('.facet');
    facet.find('.facet-name').exists().should.be.false();
    facet.find('.facet-entry-name').exists().should.be.false();
  });

  it('should render entry sustained count with class zero when the sustained_count is 0', function () {
    const data = {
      facets: [
        {
          name: 'Dummy Facet',
          entries: [
            {
              count: 99,
              'sustained_count': 0,
              name: 'Dummy Entry'
            }
          ]
        }
      ]
    };
    const wrapper = shallow(
      <SummaryStatsSection
        data={ data }
      />
    );

    const facet = wrapper.find('.facet');
    facet.find('.facet-entry-count.sustained.zero').exists().should.be.true();
  });
});
