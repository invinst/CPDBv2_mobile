import React from 'react';
import { mount } from 'enzyme';
import should from 'should';
import { Router, createMemoryHistory, Route } from 'react-router';

import TRRCard, { TRRCardWithUndo } from 'components/pinboard-page/cards/trr-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('Pinboard <TRRCard />', function () {
  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      trrDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const trrCard = mount(<TRRCard item={ item }/>);

    trrCard.exists(ItemUnpinButton).should.be.true();
    trrCard.find('.trr-date').text().should.equal('10-10-2010');
    trrCard.find('.trr-category').text().should.equal('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    const trrCard = mount(<TRRCard item={ item }/>);

    should(trrCard.find('.trr-card-map').exists()).be.true();
    should(trrCard.find('.empty-map').exists()).be.false();
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    const trrCard = mount(<TRRCard item={ item }/>);

    should(trrCard.find('.trr-card-map').exists()).be.true();
    should(trrCard.find('.empty-map').exists()).be.true();
  });

  it('should fade in when added', function () {
    const item = {
      trrDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const trrCard = mount(<TRRCard item={ item } isAdded={ true }/>);
    const trrCardDOM = trrCard.getDOMNode();

    trrCardDOM.className.should.containEql('hide');
    trrCardDOM.className.should.containEql('fade-in');
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
