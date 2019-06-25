import React from 'react';
import { Router, createMemoryHistory, Route } from 'react-router';

import { mount } from 'enzyme';
import { spy, useFakeTimers } from 'sinon';

import OfficerCard, { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import constants from 'constants';


describe('withUndoCard higher-order component', function () {
  const item = {
    type: 'OFFICER',
    isPinned: false,
    id: 123,
    rank: 'Officer as Detective',
    fullName: 'James David',
    complaintCount: '10',
  };
  let instance;

  afterEach(function () {
    instance.unmount();
  });

  it('should render wrapped component', function () {
    instance = mount(<OfficerCardWithUndo item={ item } />);

    instance.exists(OfficerCard).should.be.true();
    instance.find('.test--undo-card').exists().should.be.false();
  });

  it('should render undo card when user click remove', function () {
    instance = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ () => <OfficerCardWithUndo item={ item }/> } />
      </Router>
    );

    const unpinButton = instance.find(ItemUnpinButton);
    unpinButton.simulate('click');

    instance.exists('.test--undo-card').should.be.true();
    instance.find(OfficerCard).exists().should.be.false();
  });

  context('animation', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should render nothing when user click unpin but not undo', function () {
      const removeItemInPinboardPage = spy();
      instance = mount(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={
            () => <OfficerCardWithUndo item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
          } />
        </Router>
      );

      const unpinButton = instance.find(ItemUnpinButton);
      unpinButton.simulate('click');

      clock.tick(constants.PINBOARD_PAGE.UNDO_CARD_VISIBLE_TIME);

      instance.find('.test--undo-card').exists().should.be.false();
      instance.find(OfficerCard).exists().should.be.false();
    });

    it('should trigger to remove item 1s after click on remove button', function () {
      const removeItemInPinboardPage = spy();
      instance = mount(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={
            () => <OfficerCardWithUndo item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
          } />
        </Router>
      );

      const unpinButton = instance.find(ItemUnpinButton);
      unpinButton.simulate('click');

      clock.tick(constants.PINBOARD_PAGE.UNDO_CARD_VISIBLE_TIME);

      removeItemInPinboardPage.should.be.calledWith({
        type: 'OFFICER',
        id: 123
      });
    });

    it('should cancel remove item if click on undo button', function () {
      const removeItemInPinboardPage = spy();
      instance = mount(
        <Router history={ createMemoryHistory() }>
          <Route path='/' component={
            () => <OfficerCardWithUndo item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
          } />
        </Router>
      );

      const unpinButton = instance.find(ItemUnpinButton);
      unpinButton.simulate('click');

      const undoButton = instance.find('.undo-button');
      undoButton.simulate('click');

      clock.tick(constants.PINBOARD_PAGE.UNDO_CARD_VISIBLE_TIME);

      removeItemInPinboardPage.should.not.be.called();
    });
  });
});
