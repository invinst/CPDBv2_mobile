import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('LocationCard component', function () {
  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      dateKey: '10-10-2010',
      category: 'Use Of Force',
    };
    const wrapper = mount(<LocationCard item={ item } dateKey='dateKey'/>);

    wrapper.find(ItemUnpinButton).should.have.length(1);
    wrapper.find('.location-card-date').text().should.equal('10-10-2010');
    wrapper.find('.location-card-category').text().should.equal('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    const wrapper = mount(<LocationCard item={ item }/>);

    wrapper.find('.location-card-map').should.have.length(1);
    wrapper.find('.empty-map').should.have.length(0);
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    const wrapper = mount(<LocationCard item={ item }/>);

    wrapper.find('.location-card-map').should.have.length(1);
    wrapper.find('.empty-map').should.have.length(1);
  });

  it('should removeItemInPinboardPage when clicking on ItemUnpinButton', function () {
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'CR',
      isPinned: false,
      id: '123',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const wrapper = mount(
      <LocationCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        dateKey='incidentDate'
      />
    );
    const unpinButton = wrapper.find(ItemUnpinButton);

    unpinButton.simulate('click');

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      id: '123'
    });
  });
});
