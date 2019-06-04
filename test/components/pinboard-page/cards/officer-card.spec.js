import React from 'react';
import { mount } from 'enzyme';
import { Router, createMemoryHistory, Route } from 'react-router';

import OfficerCard, { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import RadarChart from 'components/common/radar-chart';


describe('Pinboard <OfficerCard />', function () {
  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const officerCard = mount(<OfficerCard item={ item } />);

    officerCard.exists(ItemUnpinButton).should.be.true();
    officerCard.exists(RadarChart).should.be.true();

    officerCard.find('.officer-rank').text().should.equal('Officer as Detective');
    officerCard.find('.officer-name').text().should.equal('James David');
    officerCard.find('.test--officer-cr-count').text().should.equal('10 complaints');
  });

  it('should fade in when added', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const officerCard = mount(<OfficerCard item={ item } isAdded={ true }/>);
    const officerCardDOM = officerCard.getDOMNode();

    officerCardDOM.className.should.containEql('hide');
    officerCardDOM.className.should.containEql('fade-in');
  });
});

describe('OfficerCardWithUndo component', function () {
  it('should render remove text correctly', function () {
    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ () =>  } />
      </Router>
    );
    const officerCard = wrapper.find(OfficerCard);
    const unpinButton = officerCard.find(ItemUnpinButton);

    unpinButton.simulate('click');

    wrapper.find('.text').text().should.equal('James David removed.');
  });
});
