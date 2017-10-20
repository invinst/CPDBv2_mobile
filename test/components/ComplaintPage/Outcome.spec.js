import React from 'react';
import { shallow } from 'enzyme';

import Outcome from 'components/ComplaintPage/Outcome';

describe('Outcome component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <Outcome
        finalFinding='Sustained'
        recommended='Unknown'
        finalOutcome='Penalty Not Served'
      />
    );

    wrapper.find('SectionTitle').prop('title').should.eql('Outcome');
    wrapper.find('ComplaintFinding').prop('finding').should.eql('Sustained');
    wrapper.text().should.containEql('RecommendedUnknown');
    wrapper.text().should.containEql('FinalPenalty Not Served');
  });
});
