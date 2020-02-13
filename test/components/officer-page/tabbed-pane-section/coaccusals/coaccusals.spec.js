import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import OfficerCard from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card';
import styles from 'components/officer-page/tabbed-pane-section/coaccusals/coaccusals.sass';


describe('Coaccusals component', function () {

  it('should render enough groups and coaccusal cards', function () {
    const addOrRemoveItemInPinboard = stub();
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
        ],
      },
      {
        name: 'COACCUSED 1 TIME',
        coaccusals: [
          {
            fullName: 'Richard Coyle',
            officerId: 3,
            rank: 'Police Officer',
            coaccusalCount: 1,
          },
        ],
      },
    ];

    const wrapper = shallow(
      <Coaccusals
        coaccusalGroups={ coaccusalGroups }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    const groups = wrapper.find('.coaccusals-group-name');
    wrapper.find(OfficerCard).should.have.length(3);

    groups.should.have.length(2);
    groups.at(0).text().should.eql('COACCUSED 2-4 TIMES');
    groups.at(1).text().should.eql('COACCUSED 1 TIME');

    const coaccusalCards = wrapper.find(OfficerCard);
    coaccusalCards.length.should.eql(3);
    coaccusalCards.forEach((card) => {
      card.props().customStyle.should.eql(styles.inlineOfficerCard);
      card.props().addOrRemoveItemInPinboard.should.eql(addOrRemoveItemInPinboard);
    });
  });
});
