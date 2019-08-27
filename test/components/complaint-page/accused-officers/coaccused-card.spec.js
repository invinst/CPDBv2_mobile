import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';

import CoaccusedCard from 'components/complaint-page/accused-officers/coaccused-card';
import BaseOfficerCard from 'components/common/base-officer-card';


describe('CoaccusedCard component', function () {
  const officer = {
    fullName: 'Broderick Jones',
    id: 13788,
    rank: 'Police Officer',
    percentile: {
      items: [
        { axis: 'Use of Force Reports', value: 0 },
        { axis: 'Internal Allegations', value: 87.828 },
        { axis: 'Civilian Allegations', value: 99.9817 },
      ],
      textColor: '#231F20',
      visualTokenBackground: '#f95125',
    },
    findingOutcome: 'Sustained',
    category: 'CR',
  };

  it('should render footer correctly', function () {
    const wrapper = mount(<CoaccusedCard officer={ officer } />);

    const baseCard = wrapper.find(BaseOfficerCard);
    const link = baseCard.find(Link);
    link.find('.category').text().should.equal('CR');
    link.find('.finding-outcome').text().should.equal('Sustained');
  });
});
