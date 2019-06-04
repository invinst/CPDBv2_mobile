import React from 'react';
import { mount } from 'enzyme';
import should from 'should';

import CRCard, { CRCardWithUndo } from 'components/pinboard-page/cards/cr-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('Pinboard <CRCard />', function () {
  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const crCard = mount(<CRCard item={ item }/>);

    crCard.exists(ItemUnpinButton).should.be.true();
    crCard.find('.cr-incident-date').text().should.equal('10-10-2010');
    crCard.find('.cr-category').text().should.equal('Use Of Force');
  });

  it('should render card map if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    const crCard = mount(<CRCard item={ item }/>);

    should(crCard.find('.cr-card-map').exists()).be.true();
    should(crCard.find('.empty-map').exists()).be.false();
  });

  it('should render empty card map if point of item is null', function () {
    const item = { point: null };
    const crCard = mount(<CRCard item={ item }/>);

    should(crCard.find('.cr-card-map').exists()).be.true();
    should(crCard.find('.empty-map').exists()).be.true();
  });

  it('should fade in when added', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const crCard = mount(<CRCard item={ item } isAdded={ true }/>);
    const crCardDOM = crCard.getDOMNode();

    crCardDOM.className.should.containEql('hide');
    crCardDOM.className.should.containEql('fade-in');
  });
});

describe('Pinboard <CRCardWithUndo />', function () {
  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = mount(
      <CRCardWithUndo item={ item }/>
    );
    const crCard = wrapper.find(CRCard);
    const unpinButton = crCard.find(ItemUnpinButton);

    unpinButton.simulate('click');

    wrapper.find('.text').text().should.equal('CR removed.');
  });
});
