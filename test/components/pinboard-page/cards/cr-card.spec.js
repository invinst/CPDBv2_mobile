import React from 'react';
import { mount } from 'enzyme';

import CRCard, { CRCardWithUndo } from 'components/pinboard-page/cards/cr-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import LocationCard from 'components/pinboard-page/cards/location-card';


describe('Pinboard <CRCard />', function () {
  it('should render LocationCard component', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
      id: '1234',
    };
    const wrapper = mount(<CRCard item={ item } someOtherProp='abcd'/>);
    const locationCard = wrapper.find(LocationCard);

    locationCard.props().item.should.eql(item);
    locationCard.props().someOtherProp.should.equal('abcd');
    locationCard.props().url.should.equal('/complaint/1234/');
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

    wrapper.find('.undo-card-text').text().should.equal('CR removed.');
  });
});
