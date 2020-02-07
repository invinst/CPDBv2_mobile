import React from 'react';
import { mount } from 'enzyme';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import { mountWithRouter } from 'utils/tests';
import TRRCard, { TRRCardWithUndo } from 'components/pinboard-page/cards/trr-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import LocationCard from 'components/pinboard-page/cards/location-card';


describe('Pinboard <TRRCard />', function () {
  it('should render LocationCard correctly', function () {
    const item = {
      trrDate: '10-10-2010',
      category: 'Use Of Force',
      id: '1234',
    };
    const wrapper = mountWithRouter(<TRRCard item={ item } someOtherProp='abcd'/>);
    const locationCard = wrapper.find(LocationCard);

    locationCard.props().item.should.eql(item);
    locationCard.props().someOtherProp.should.equal('abcd');
    locationCard.props().url.should.equal('/trr/1234/');
  });
});

describe('Pinboard <TRRCardWithUndo />', function () {
  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    const wrapper = mount(
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={ () => <TRRCardWithUndo item={ item }/> } />
      </Router>
    );
    const crCard = wrapper.find(TRRCard);
    const unpinButton = crCard.find(ItemUnpinButton);

    unpinButton.simulate('click');

    wrapper.find('.undo-card-text').text().should.equal('TRR removed.');
  });
});
