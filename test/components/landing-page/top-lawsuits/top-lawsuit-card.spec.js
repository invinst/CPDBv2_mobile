import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import TopLawsuitCard from 'components/landing-page/top-lawsuits/top-lawsuit-card';

describe('TopLawsuitCard component', function () {
  it('should render enough contents', function () {
    const lawsuit = {
      caseNo: '00-L-1234',
      incidentDate: 'Jan 23, 2000',
      summary: 'Lorem ipsum',
    };
    const wrapper = shallow(<TopLawsuitCard lawsuit={ lawsuit } />);
    const element = wrapper.find(Link);
    element.prop('to').should.eql('/lawsuit/00-L-1234/');
    element.find('.incident-date').text().should.eql('Jan 23, 2000');
    const summary = element.find('.lawsuit-summary');
    summary.text().should.eql('Lorem ipsum');
    summary.find('.gradient').exists().should.be.true();
  });
});
