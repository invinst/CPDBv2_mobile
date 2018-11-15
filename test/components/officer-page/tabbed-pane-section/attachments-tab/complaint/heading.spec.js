import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';

import Heading from 'components/officer-page/tabbed-pane-section/attachments-tab/complaint/heading';


describe('Heading component', function () {
  const complaint = {
    crid: 307775,
    officerId: 12074,
    category: 'Use Of Force',
    finding: 'Not Sustained',
    outcome: 'No Action Taken',
    date: 'MAR 1',
    coaccused: 4,
  };

  it('should render with correct content', function () {
    const wrapper = shallow(
      <Heading complaint={ complaint }/>,
    );

    wrapper.find('.category').text().should.eql('Use Of Force');
    wrapper.find('.finding').text().should.eql('Not Sustained, No Action Taken');
    wrapper.find('.date').text().should.eql('MAR 1');
    wrapper.find(Link).prop('to').should.eql('/complaint/307775/');
  });

  it('should change kind style when "Sustained"', function () {
    const complaint = {
      crid: '307775',
      officerId: '12074',
      category: 'Use Of Force',
      finding: 'Sustained',
      outcome: 'No Action Taken',
      date: 'MAR 1',
      coaccused: 4,
    };
    const wrapper = shallow(
      <Heading complaint={ complaint }/>,
    );

    wrapper.find('.kind.active').exists().should.be.true();
  });
});
