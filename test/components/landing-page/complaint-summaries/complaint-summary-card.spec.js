import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import ComplaintSummaryCard from 'components/landing-page/complaint-summaries/complaint-summary-card';

describe('<ComplaintSummaryCard />', () => {
  it('should render enough contents', () => {
    const allegation = {
      crid: '123456',
      incidentDate: 'Jan 23, 2000',
      summary: 'Lorem ipsum',
    };
    const wrapper = shallow(<ComplaintSummaryCard allegation={ allegation } />);
    const element = wrapper.find(Link);
    element.prop('to').should.eql('/complaint/123456/');
    element.find('.incident-date').text().should.eql('Jan 23, 2000');
    const summary = element.find('.complaint-summary');
    summary.text().should.eql('Lorem ipsum');
    summary.find('.gradient').exists().should.be.true();
  });
});
