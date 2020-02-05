import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PinnedType from 'components/pinboard-page/pinned-type';
import PinnedGrid from 'components/pinboard-page/pinned-type/pinned-grid';
import LoadingSpinner from 'components/common/loading-spinner';


describe('<PinnedType />', function () {
  it('should render PinnedGrid with correct props', function () {
    const removeItemInPinboardPage = sinon.spy();
    const orderPinboard = sinon.spy();
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = shallow(
      <PinnedType
        type='CR'
        items={ items }
        requesting={ false }
        title='Complaints'
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );

    const pinnedGrid = pinnedType.find(PinnedGrid);
    pinnedGrid.prop('type').should.eql('CR');
    pinnedGrid.prop('removeItemInPinboardPage').should.eql(removeItemInPinboardPage);
    pinnedGrid.prop('orderPinboard').should.eql(orderPinboard);
    should(pinnedGrid.prop('requesting')).be.undefined();
    should(pinnedGrid.prop('title')).be.undefined();
  });

  it('should still render PinnedGrid when requesting but items is not empty', function () {
    const removeItemInPinboardPage = sinon.spy();
    const orderPinboard = sinon.spy();
    const items = [{ 'id': '1' }, { 'id': '2' }];
    const pinnedType = shallow(
      <PinnedType
        type='TRR'
        items={ items }
        requesting={ true }
        title='Complaints'
        removeItemInPinboardPage={ removeItemInPinboardPage }
        orderPinboard={ orderPinboard }
      />
    );

    const pinnedGrid = pinnedType.find(PinnedGrid);
    pinnedGrid.prop('type').should.eql('TRR');
    pinnedGrid.prop('removeItemInPinboardPage').should.eql(removeItemInPinboardPage);
    pinnedGrid.prop('orderPinboard').should.eql(orderPinboard);
    should(pinnedGrid.prop('requesting')).be.undefined();
    should(pinnedGrid.prop('title')).be.undefined();
  });

  it('should render LoadingSpinner if requesting', function () {
    const wrapper = shallow(<PinnedType type='CR' items={ [] } requesting={ true }/>);

    const loadingSpinner = wrapper.find(LoadingSpinner);
    loadingSpinner.prop('className').should.equal('type-cards-loading');
  });

  it('should render nothing if no items and not requesting', function () {
    const wrapper = shallow(<PinnedType type='CR' items={ [] } requesting={ false }/>);

    wrapper.find('div').should.have.length(0);
  });
});
