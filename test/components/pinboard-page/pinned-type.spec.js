import React from 'react';
import { mount } from 'enzyme';

import PinnedType from 'components/pinboard-page/pinned-type';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';


describe('<PinnedType />', function () {
  it('should render CR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='CR' items={ items } />);

    const crCards = pinnedType.find(CRCard);
    crCards.should.have.length(2);
    crCards.get(0).props.item.id.should.eql('1');
    crCards.get(1).props.item.id.should.eql('2');
  });

  it('should render OFFICER cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='OFFICER' items={ items } />);

    const officerCards = pinnedType.find(OfficerCard);
    officerCards.should.have.length(2);
    officerCards.get(0).props.item.id.should.eql('1');
    officerCards.get(1).props.item.id.should.eql('2');
  });

  it('should render TRR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='TRR' items={ items } />);

    const trrCards = pinnedType.find(TRRCard);
    trrCards.should.have.length(2);
    trrCards.get(0).props.item.id.should.eql('1');
    trrCards.get(1).props.item.id.should.eql('2');
  });
});
