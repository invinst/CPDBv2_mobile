import React from 'react';
import { Router, createMemoryHistory, Route } from 'react-router';

import { mount } from 'enzyme';
import { spy } from 'sinon';

import OfficerCardComponent from 'components/pinboard-page/cards/officer-card';
import { OfficerCard } from 'components/pinboard-page/pinned-type';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('withUndoCard higher-order component', function () {
  const item = {
    type: 'OFFICER',
    isPinned: false,
    id: 123,
    rank: 'Officer as Detective',
    fullName: 'James David',
    complaintCount: '10',
  };let instance;

  afterEach(function () {
    instance.unmount();
  });

  it('should render wrapped component', function () {
    instance = mount(<OfficerCard item={ item } />);

    instance.exists(OfficerCardComponent).should.be.true();
    instance.find('.test--undo-card').exists().should.be.false();
  });

  it('should render undo card when user click remove', function () {
    instance = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ () => <OfficerCard item={ item }/> } />
      </Router>
    );

    const unpinButton = instance.find(ItemUnpinButton);
    unpinButton.simulate('click');

    instance.exists('.test--undo-card').should.be.true();
    instance.find(OfficerCardComponent).exists().should.be.false();
  });

  it('should render nothing when user click unpin but not undo', function (done) {
    const removeItemInPinboardPage = spy();
    instance = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={
          () => <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
        } />
      </Router>
    );

    const unpinButton = instance.find(ItemUnpinButton);
    unpinButton.simulate('click');

    setTimeout(() => {
      instance.find('.test--undo-card').exists().should.be.false();
      instance.find(OfficerCardComponent).exists().should.be.false();
      done();
    }, 1050);
  });

  it('should trigger to remove item 1s after click on remove button', function (done) {
    const removeItemInPinboardPage = spy();
    instance = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={
          () => <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
        } />
      </Router>
    );

    const unpinButton = instance.find(ItemUnpinButton);
    unpinButton.simulate('click');

    setTimeout(() => {
      removeItemInPinboardPage.should.be.calledWith({
        type: 'OFFICER',
        id: 123
      });
      done();
    }, 1050);
  });

  it('should cancel remove item if click on undo button', function (done) {
    const removeItemInPinboardPage = spy();
    instance = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={
          () => <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
        } />
      </Router>
    );

    const unpinButton = instance.find(ItemUnpinButton);
    unpinButton.simulate('click');

    const undoButton = instance.find('.undo-button');
    undoButton.simulate('click');

    setTimeout(() => {
      removeItemInPinboardPage.should.not.be.called();
      done();
    }, 1050);
  });
});
