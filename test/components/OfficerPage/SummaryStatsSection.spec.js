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

  it('should render header and total count', function () {
    const data = {
      name: 'Dummy Header',
      count: 11,
      facets: []
    };
    const wrapper = shallow(
      <SummaryStatsSection
        data={ data }
      />
    );

    wrapper.find('.total').text().should.be.eql('Total11');
  });

  it('should render facets', function () {
    const data = {
      facets: [
        {
          name: 'Dummy Facet',
          entries: [
            {
              count: 99,
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

    wrapper.find('.facet-name').text().should.be.eql('Dummy Facet');
    wrapper.find('.facet-entry-count').text().should.be.eql('99');
    wrapper.find('.facet-entry-name').text().should.be.eql('Dummy Entry');
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

    wrapper.find('.facet-name').exists().should.be.false();
    wrapper.find('.facet-entry-name').exists().should.be.false();
  });
});
