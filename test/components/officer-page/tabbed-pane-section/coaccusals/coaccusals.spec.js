import React from 'react';
import { shallow } from 'enzyme';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import OfficerCard from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card';


describe('Coaccusals component', function () {
  let wrapper;

  it('should render enough groups and coaccusal cards', function () {
    const coaccusalGroups = [
      {
        name: 'COACCUSED 2-4 TIMES',
        coaccusals: [
          {
            fullName: 'Jerome Finnigan',
            officerId: 1,
            rank: 'Police Officer',
            coaccusalCount: 4,
          },
          {
            fullName: 'Edward may',
            officerId: 2,
            rank: 'Detective',
            coaccusalCount: 2,
          },
        ]
      },
      {
        name: 'COACCUSED 1 TIME',
        coaccusals: [
          {
            fullName: 'Richard Coyle',
            officerId: 3,
            rank: 'Police Officer',
            coaccusalCount: 1,
          }
        ]
      },
    ];

    wrapper = shallow(<Coaccusals coaccusalGroups={ coaccusalGroups }/>);

    const groups = wrapper.find('.coaccusals-group-name');
    wrapper.find(OfficerCard).should.have.length(3);

    groups.should.have.length(2);
    groups.at(0).text().should.eql('COACCUSED 2-4 TIMES');
    groups.at(1).text().should.eql('COACCUSED 1 TIME');
  });
});
