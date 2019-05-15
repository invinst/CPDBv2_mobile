import React from 'react';
import { mount } from 'enzyme';
import { stub, useFakeTimers } from 'sinon';

import PinnedType from 'components/pinboard-page/pinned-type';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import * as murri from 'utils/muuri';


describe('<PinnedType />', function () {
  it('should render CR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='CR' items={ items } />);

    const crCards = pinnedType.find(CRCard);
    crCards.should.have.length(2);
    crCards.get(0).props.item.id.should.eql('1');
    crCards.get(1).props.item.id.should.eql('2');
  });

  it('should render OFFICER cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='OFFICER' items={ items } />);

    const officerCards = pinnedType.find(OfficerCard);
    officerCards.should.have.length(2);
    officerCards.get(0).props.item.id.should.eql('1');
    officerCards.get(1).props.item.id.should.eql('2');
  });

  it('should render TRR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='TRR' items={ items } />);

    const trrCards = pinnedType.find(TRRCard);
    trrCards.should.have.length(2);
    trrCards.get(0).props.item.id.should.eql('1');
    trrCards.get(1).props.item.id.should.eql('2');
  });

  it('should render newly added item with correct props', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='TRR' items={ items } />);

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    pinnedType.setProps({ items: newItems });

    const trrCards = pinnedType.find(TRRCard);
    trrCards.should.have.length(3);
    trrCards.get(0).props.item.id.should.eql('1');
    trrCards.get(0).props.isAdded.should.be.false();
    trrCards.get(1).props.item.id.should.eql('2');
    trrCards.get(1).props.isAdded.should.be.false();
    trrCards.get(2).props.item.id.should.eql('3');
    trrCards.get(2).props.isAdded.should.be.true();
  });

  it('should init Muuri grid', function () {
    const onMuuriStub = stub();
    const MuuriStub = stub(murri, 'Muuri').callsFake(() => ({ 'on': onMuuriStub }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='TRR' items={ items } />);
    const instance = pinnedType.instance();

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);

    MuuriStub.restore();
  });

  it('should reset grid when did update', function () {
    const onMuuriStub = stub();
    const destroyMuuriStub = stub();
    const MuuriStub = stub(murri, 'Muuri').callsFake(() => ({
      'on': onMuuriStub,
      'destroy': destroyMuuriStub,
    }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(<PinnedType type='OFFICER' items={ items } />);

    MuuriStub.resetHistory();
    onMuuriStub.resetHistory();
    destroyMuuriStub.should.not.be.called();

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    pinnedType.setProps({ type: 'OFFICER', items: newItems });
    const instance = pinnedType.instance();

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    destroyMuuriStub.should.be.calledOnce();
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);

    MuuriStub.restore();
  });

  it('should remove item from the grid when removeItemInPinboardPage is called', function () {
    const clock = useFakeTimers();
    const muuri = new murri.Muuri();
    muuri.remove.resetHistory();

    const removeItemInPinboardPage = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(
      <PinnedType
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );
    const instance = pinnedType.instance();

    instance.removeItemInPinboardPage({ 'id': '1' });

    muuri.remove.should.be.calledWith(instance.itemElements['1']);
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(250);

    removeItemInPinboardPage.should.be.calledWith({ 'id': '1' });

    muuri.remove.resetHistory();
    clock.restore();
  });

  it('should invoke orderPinboard with type OFFICER when dragEnd', function () {
    const muuri = new murri.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const pinnedType = mount(
      <PinnedType
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = pinnedType.instance();

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'OFFICER', 'ids': [2, 1] });
  });

  it('should not invoke orderPinboard when no change', function () {
    const muuri = new murri.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const pinnedType = mount(
      <PinnedType
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = pinnedType.instance();

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
    ];

    instance.updateOrder();
    orderPinboard.should.not.be.called();
  });

  it('should invoke orderPinboard with type CR when dragEnd', function () {
    const muuri = new murri.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = mount(
      <PinnedType
        type='CR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = pinnedType.instance();

    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => '2' }) },
      { 'getElement': () => ({ 'getAttribute': () => '1' }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'CR', 'ids': ['2', '1'] });
  });

  it('should invoke orderPinboard with type TRR when dragEnd', function () {
    const muuri = new murri.Muuri();

    const removeItemInPinboardPage = stub();
    const orderPinboard = stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const pinnedType = mount(
      <PinnedType
        type='TRR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = pinnedType.instance();

    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'TRR', 'ids': [2, 1] });
  });
});
