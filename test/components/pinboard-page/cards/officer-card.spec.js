import React from 'react';
import { mount } from 'enzyme';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import sinon from 'sinon';

import { mountWithRouter } from 'utils/tests';
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
    const officerCard = mountWithRouter(<OfficerCard item={ item } />);

    officerCard.exists(ItemUnpinButton).should.be.true();
    officerCard.exists(RadarChart).should.be.true();

    officerCard.find('.officer-rank').text().should.equal('Officer as Detective');
    officerCard.find('.officer-name').text().should.equal('James David');
    officerCard.find('.test--officer-cr-count').text().should.equal('10 complaints');
  });

  it('should invoke removeItemInPinboardPage when clicking on ItemUnpinButton', function () {
    const removeItemInPinboardPage = sinon.spy();

    const item = {
      type: 'OFFICER',
      isPinned: false,
      id: 123,
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    const wrapper = mount(
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={ () =>
          <OfficerCard
            item={ item }
            removeItemInPinboardPage={ removeItemInPinboardPage }
          /> } />
      </Router>
    );
    const unpinButton = wrapper.find(ItemUnpinButton);

    unpinButton.simulate('click');

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'OFFICER',
      id: 123,
    });
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
      <Router history={ createBrowserHistory() }>
        <Route path='/' component={ () => <OfficerCardWithUndo item={ item } /> } />
      </Router>
    );
    const officerCard = wrapper.find(OfficerCard);
    const unpinButton = officerCard.find(ItemUnpinButton);

    unpinButton.simulate('click');

    wrapper.find('.undo-card-text').text().should.equal('James David removed.');
  });
});
