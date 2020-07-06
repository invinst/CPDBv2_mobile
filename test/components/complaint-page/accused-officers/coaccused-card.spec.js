import React from 'react';
import { Link } from 'react-router-dom';
import { spy } from 'sinon';
import { random } from 'faker';

import { mountWithRouter } from 'utils/tests';
import ItemPinButton from 'components/common/item-pin-button';
import pinButtonStyles from 'components/common/item-pin-button.sass';
import { PINBOARD_PAGE } from 'constants';
import CoaccusedCard from 'components/complaint-page/accused-officers/coaccused-card';
import BaseOfficerCard from 'components/common/base-officer-card';


describe('CoaccusedCard component', function () {
  const isPinned = random.boolean();
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
    isPinned,
  };

  it('should render footer correctly', function () {
    const wrapper = mountWithRouter(<CoaccusedCard officer={ officer } />);

    const baseCard = wrapper.find(BaseOfficerCard);
    const link = baseCard.find(Link);
    link.find('.category').text().should.equal('CR');
    link.find('.finding-outcome').text().should.equal('Sustained');
  });

  it('should render ItemPinButton with correct props', function () {
    const addOrRemoveItemInPinboard = spy();

    const wrapper = mountWithRouter(
      <CoaccusedCard
        officer={ officer }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />
    );

    const itemPinButton = wrapper.find(ItemPinButton);
    itemPinButton.props().className.should.equal(pinButtonStyles.cardPinnedButton);
    itemPinButton.props().addOrRemoveItemInPinboard.should.equal(addOrRemoveItemInPinboard);
    itemPinButton.props().showHint.should.be.false();
    itemPinButton.props().item.should.eql({
      type: PINBOARD_PAGE.PINNED_ITEM_TYPES.OFFICER,
      id: 13788,
      isPinned,
      fullName: officer.fullName,
    });
  });
});
