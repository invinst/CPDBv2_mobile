import React from 'react';
import { Link } from 'react-router';
import { mount } from 'enzyme';

import OfficerCard from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card';
import BaseOfficerCard from 'components/common/base-officer-card';


describe('CoaccusalCard', function () {
  const officer = {
    officerId: 8562,
    fullName: 'Jerome Finnigan',
    percentile: {
      items: [
        { axis: 'Use of Force Reports', value: 0 },
        { axis: 'Internal Allegations', value: 87.828 },
        { axis: 'Civilian Allegations', value: 99.9817 },
      ],
      officerId: undefined,
      textColor: '#231F20',
      visualTokenBackground: '#f95125',
      year: undefined,
    },
    coaccusalCount: 11,
    rank: 'Police Officer',
  };

  it('should render footer correctly', function () {
    const wrapper = mount(<OfficerCard { ...officer } />);

    const baseCard = wrapper.find(BaseOfficerCard);
    const link = baseCard.find(Link);

    link.find('.coaccusal-count').text().should.equal('11 Coaccusals');
  });

  it('should not pluralize coaccusals count when coaccusalCount is singular', function () {
    const noPercentileOfficer = {
      fullName: 'Broderick Jones',
      officerId: 123456,
      percentile: undefined,
      coaccusalCount: 1,
      rank: 'Detective',
    };
    const wrapper = mount(<OfficerCard { ...noPercentileOfficer } />);
    const baseCard = wrapper.find(BaseOfficerCard);
    const link = baseCard.find(Link);

    link.find('.coaccusal-count').text().should.equal('1 Coaccusal');
  });
});
