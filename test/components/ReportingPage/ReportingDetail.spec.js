/* eslint-disable react/jsx-key */
import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import ReportingDetail from 'components/ReportingPage/ReportingDetail';

describe('<ReportingDetail />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(
      <ReportingDetail
        requestReport={ () => {} }
        report={ {} }
      />
    );
    wrapper.should.be.ok();
  });

  it('should not render anything if data is not loaded', () => {
    const report = {
      loaded: false
    };

    const wrapper = shallow(
      <ReportingDetail
        requestReport={ () => {} }
        report={ report }
      />
    );

    should(wrapper.type()).equal(null);
  });

  it('should start loading data on mount if not already loaded', () => {
    const report = {
      loaded: false
    };
    const requestReport = spy();

    shallow(
      <ReportingDetail
        requestReport={ requestReport }
        report={ report }
      />
    );

    requestReport.called.should.be.true();
  });

  it('should render report data correctly', () => {
    const report = {
      loaded: true,
      title: ['A title', 'Or two.'],
      publication: 'Pub',
      publishDate: 'Feb 31, 2017',
      author: 'The author',
      excerpt: ['One.', 'Two.']
    };

    const wrapper = shallow(
      <ReportingDetail
        requestReport={ () => {} }
        report={ report }
      />
    );

    wrapper.find('.report-title').text().should.eql('A title. Or two.');

    const body = wrapper.find('.report-body');

    const metadataRows = body.find('table.metadata > tbody > tr');
    const metadata = [
      ['Publication', 'Pub'],
      ['Publish Date', 'Feb 31, 2017'],
      ['Author', 'The author']
    ];
    metadata.map(([fieldName, value], index) => {
      const tds = metadataRows.at(index).children();
      tds.at(0).text().should.eql(fieldName);
      tds.at(1).text().should.eql(value);
    });

    body.containsAllMatchingElements([
      <p>One.</p>,
      <p>Two.</p>
    ]).should.be.true();
  });
});
