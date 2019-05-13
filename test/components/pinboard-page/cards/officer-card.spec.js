import React from 'react';
import { mount } from 'enzyme';
import { Router, createMemoryHistory, Route } from 'react-router';

import OfficerCard from 'components/pinboard-page/cards/officer-card';
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

  it('should fade out when removed', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ () => <OfficerCard item={ item }/> } />
      </Router>
    );
    const officerCard = wrapper.find(OfficerCard);
    const unpinButton = officerCard.find(ItemUnpinButton);

    unpinButton.simulate('click');

    officerCard.getDOMNode().className.should.containEql('fade-out');
  });
});
