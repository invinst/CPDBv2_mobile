import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import constants from 'constants';

import ReportSearchResult from 'components/SearchPage/ReportSearchResult';

describe('<ReportSearchResult />', () => {

  it('should render report correctly', () => {
    const report = {
      id: '2',
      title: 'foo',
      publication: 'NYT',
      publishDate: 'whenever'
    };

    const wrapper = mount(
      <ReportSearchResult
        report={ report }
        saveToRecent={ () => {} }
      />
    );

    const href = `${constants.REPORTING_PATH}/2`;
    const reportLink = wrapper.find('Link');

    reportLink.exists().should.be.true();
    reportLink.hasClass('report-row').should.be.true();
    reportLink.prop('to').should.be.eql(href);
    reportLink.text().should.eql('NYTwheneverfoo');
  });

  it('should dispatch "saveToRecent" action when clicked', () => {
    const spySaveToRecent = spy();
    const report = {
      id: '3',
      title: 'foo',
      publication: 'NYT',
      publishDate: 'whenever'
    };

    const wrapper = shallow(
      <ReportSearchResult
        report={ report }
        saveToRecent={ spySaveToRecent }
      />
    );

    wrapper.simulate('click');
    spySaveToRecent.calledWith({
      type: 'Report',
      title: 'foo',
      url: `${constants.REPORTING_PATH}/3`
    }).should.be.true();
  });

});
