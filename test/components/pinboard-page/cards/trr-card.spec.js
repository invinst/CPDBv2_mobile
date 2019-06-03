import React from 'react';
import { mount } from 'enzyme';
import { Router, createMemoryHistory, Route } from 'react-router';

import TRRCard, { TRRCardWithUndo } from 'components/pinboard-page/cards/trr-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import LocationCard from 'components/pinboard-page/cards/location-card';



describe('Pinboard <TRRCard />', function () {
  it('should render LocationCard correctly', function () {
    const item = {
      trrDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const trrCard = mount(<TRRCard item={ item }/>);

    trrCard.exists(LocationCard).should.be.true();
  });
});

describe('Pinboard <TRRCardWithUndo />', function () {
  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ () => <TRRCardWithUndo item={ item }/> } />
      </Router>
    );
    const crCard = wrapper.find(TRRCard);
    const unpinButton = crCard.find(ItemUnpinButton);

    unpinButton.simulate('click');

    wrapper.find('.text').text().should.equal('TRR removed.');
  });
});
