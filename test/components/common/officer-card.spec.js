import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';

import OfficerCard from 'components/common/officer-card';
import BaseOfficerCard from 'components/common/base-officer-card';


describe('<OfficerCard />', function () {
  const officer = {
    'complaint_count': 104,
    'full_name': 'Broderick Jones',
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
  };

  it('should render footer correctly', function () {
    const wrapper = mount(<OfficerCard officer={ officer } />);

    const baseCard = wrapper.find(BaseOfficerCard);
    const link = baseCard.find(Link);
    link.find('.complaint-count').text().should.equal('104 complaints');
  });

  it('should not pluralize complaint count when complaint_count is singular', function () {
    const noPercentileOfficer = {
      'complaint_count': 1,
      'full_name': 'Broderick Jones',
      id: 13788,
      percentile: undefined,
      rank: 'Police Officer',
    };
    const wrapper = mount(<OfficerCard officer={ noPercentileOfficer } />);

    const baseCard = wrapper.find(BaseOfficerCard);
    const link = baseCard.find(Link);
    link.find('.complaint-count').text().should.equal('1 complaint');
  });
});
