import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import PinnedGrid from 'components/pinboard-page/pinned-type/pinned-grid';
import { CRCardWithUndo } from 'components/pinboard-page/cards/cr-card';
import { OfficerCardWithUndo } from 'components/pinboard-page/cards/officer-card';
import { TRRCardWithUndo } from 'components/pinboard-page/cards/trr-card';
import * as muuriVendor from 'utils/muuri';
import * as navigation from 'utils/navigation-util';


describe('<PinnedGrid />', function () {
  it('should render CR cards', function () {
    const items = [{
      crid: '1000001',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }, {
      crid: '1000002',
      type: 'CR',
      isPinned: true,
      incidentDate: '2010-01-01',
      category: 'Use Of Force',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }];

    const wrapper = shallow(<PinnedGrid type='CR' items={ items }/>);
    const crCards = wrapper.find(CRCardWithUndo);

    crCards.should.have.length(2);
    crCards.at(0).prop('item').should.eql(items[0]);
    crCards.at(1).prop('item').should.eql(items[1]);
  });

  it('should render OFFICER cards', function () {
    const items = [{
      id: 1,
      type: 'OFFICER',
      isPinned: true,
      officerId: 1,
      fullName: 'Daryl Mack',
      complaintCount: 0,
      sustainedCount: 0,
      complaintPercentile: 99.3450,
      birthYear: 1975,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      percentile: {},
    }, {
      id: 2,
      type: 'OFFICER',
      isPinned: true,
      officerId: 2,
      fullName: 'Daryl Mack',
      complaintCount: 0,
      sustainedCount: 0,
      complaintPercentile: 99.3450,
      birthYear: 1975,
      race: 'White',
      gender: 'Male',
      rank: 'Police Officer',
      percentile: {},
    }];

    const wrapper = shallow(<PinnedGrid type='OFFICER' items={ items }/>);

    const officerCards = wrapper.find(OfficerCardWithUndo);

    officerCards.should.have.length(2);
    officerCards.at(0).prop('item').should.eql(items[0]);
    officerCards.at(1).prop('item').should.eql(items[1]);
  });

  it('should render TRR cards', function () {
    const items = [{
      id: 1,
      type: 'TRR',
      isPinned: true,
      category: 'Impact Weapon',
      trrDate: '2012-01-01',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }, {
      id: 2,
      type: 'TRR',
      isPinned: true,
      category: 'Impact Weapon',
      trrDate: '2012-01-01',
      point: { 'lon': 1.0, 'lat': 1.0 },
      isPinStatusChanging: false,
    }];

    const wrapper = shallow(<PinnedGrid type='TRR' items={ items }/>);
    const trrCards = wrapper.find(TRRCardWithUndo);

    trrCards.should.have.length(2);
    trrCards.at(0).prop('item').should.eql(items[0]);
    trrCards.at(1).prop('item').should.eql(items[1]);
  });

  it('should maintain the scroll position since second rerender', function () {
    sinon.stub(navigation, 'getPageYBottomOffset').returns(700);
    sinon.stub(navigation, 'scrollByBottomOffset');

    const wrapper = mount(<PinnedGrid type='TRR' items={ [{ 'id': '1' }] } />);

    const items = [{ 'id': '1' }, { 'id': '2' }];
    wrapper.setProps({ items });

    navigation.scrollByBottomOffset.should.not.be.called();

    const otherItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    wrapper.setProps({ items: otherItems });

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(700);

    navigation.scrollByBottomOffset.resetHistory();
    navigation.getPageYBottomOffset.restore();
    sinon.stub(navigation, 'getPageYBottomOffset').returns(400);

    wrapper.setProps({ items: [{ 'id': '2' }] });

    navigation.scrollByBottomOffset.should.be.calledOnce();
    navigation.scrollByBottomOffset.should.be.calledWith(400);
  });

  it('should init Muuri grid', function () {
    const onMuuriStub = sinon.stub();
    const MuuriStub = sinon.stub(muuriVendor, 'Muuri').callsFake(() => ({ 'on': onMuuriStub }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(<PinnedGrid type='OFFICER' items={ items } />);
    const instance = wrapper.instance();

    MuuriStub.should.be.calledWith(instance.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });
    onMuuriStub.should.be.calledWith('dragEnd', instance.updateOrder);
  });

  it('should update grid when did update', function () {
    const onMuuriStub = sinon.stub();
    const addMuuriStub = sinon.stub();
    sinon.stub(muuriVendor, 'Muuri').callsFake(() => ({
      'on': onMuuriStub,
      'add': addMuuriStub,
    }));

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(<PinnedGrid type='OFFICER' items={ items } />);
    const instance = wrapper.instance();

    onMuuriStub.resetHistory();
    addMuuriStub.should.not.be.called();

    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    wrapper.setProps({ items: newItems });

    addMuuriStub.should.be.calledOnce();
    addMuuriStub.should.be.calledWith(instance.itemElements['3']);
  });

  it('should remove item from the grid when removeItemInPinboardPage is called', function () {
    const clock = sinon.useFakeTimers();
    const muuri = new muuriVendor.Muuri();
    muuri.remove.resetHistory();

    const removeItemInPinboardPage = sinon.stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const instance = wrapper.instance();
    instance.removeItemInPinboardPage({ 'id': '1' });

    muuri.remove.should.be.calledWith(instance.itemElements['1']);
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(250);

    removeItemInPinboardPage.should.be.calledWith({ 'id': '1' });
  });

  it('should invoke orderPinboard with type OFFICER when dragEnd', function () {
    const muuri = new muuriVendor.Muuri();
    muuri.on.resetHistory();

    const removeItemInPinboardPage = sinon.stub();
    const orderPinboard = sinon.stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'OFFICER', 'ids': [2, 1] });
  });

  it('should not invoke orderPinboard when no change', function () {
    const muuri = new muuriVendor.Muuri();
    muuri.on.resetHistory();

    const removeItemInPinboardPage = sinon.stub();
    const orderPinboard = sinon.stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='OFFICER'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
    ];

    instance.updateOrder();
    orderPinboard.should.not.be.called();
  });

  it('should invoke orderPinboard with type CR when dragEnd', function () {
    const muuri = new muuriVendor.Muuri();

    const removeItemInPinboardPage = sinon.stub();
    const orderPinboard = sinon.stub();

    const items = [{ 'id': '1' }, { 'id': '2' }];
    const wrapper = mount(
      <PinnedGrid
        type='CR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => '2' }) },
      { 'getElement': () => ({ 'getAttribute': () => '1' }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'CR', 'ids': ['2', '1'] });
  });

  it('should invoke orderPinboard with type TRR when dragEnd', function () {
    const muuri = new muuriVendor.Muuri();

    const removeItemInPinboardPage = sinon.stub();
    const orderPinboard = sinon.stub();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='TRR'
        items={ items }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );
    const instance = wrapper.instance();
    instance.gridMuuri.getItems = () => [
      { 'getElement': () => ({ 'getAttribute': () => 2 }) },
      { 'getElement': () => ({ 'getAttribute': () => 1 }) },
    ];

    muuri.on.should.be.calledWith('dragEnd', instance.updateOrder);
    instance.updateOrder();

    orderPinboard.should.be.calledWith({ type: 'TRR', 'ids': [2, 1] });
  });

  it('should destroy muuri grid on componentWillUnmount', function () {
    const muuri = new muuriVendor.Muuri();
    muuri.destroy.resetHistory();

    const items = [{ 'id': 1 }, { 'id': 2 }];
    const wrapper = mount(
      <PinnedGrid
        type='TRR'
        items={ items }
      />
    );
    wrapper.unmount();

    muuri.destroy.should.be.calledOnce();
  });
});
