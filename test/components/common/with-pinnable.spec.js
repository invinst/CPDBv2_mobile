import React from 'react';
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';
import { lorem, random } from 'faker';

import withPinnable from 'components/common/with-pinnable';
import { PINBOARD_PAGE } from 'constants';


describe('ItemPinButton component', function () {
  const firstCRID = lorem.word();
  const secondCRID = lorem.word();
  const officerID = random.number({ min: 10, max: 1000 });

  function TestComponent(props) {
    return <div className='test--classname' />;
  }

  const TestComponentWithPinnable = withPinnable(TestComponent);

  it('should render children', function () {
    const wrapper = mount(
      <TestComponentWithPinnable
        item={ { type: 'OFFICER', id: officerID, isPinned: false } }
      />
    );

    wrapper.find('.test--classname').exists().should.be.true();
  });

  it('should handle on pin button click', function () {
    const addOrRemoveItemInPinboardStub = stub();
    const setPinButtonIntroductionVisitedSpy = spy();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        item={ { type: 'OFFICER', id: officerID, isPinned: false } }
        visitPinButtonIntroduction={ setPinButtonIntroductionVisitedSpy }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: officerID,
      isPinned: false,
    }).should.be.true();

    setPinButtonIntroductionVisitedSpy.should.be.calledOnce();
    setPinButtonIntroductionVisitedSpy.resetHistory();
    wrapper.setProps({ isPinButtonIntroductionVisited: true });
    childComponent.simulate('click');
    setPinButtonIntroductionVisitedSpy.should.not.be.called();
  });

  it('should handle on pin button with all items are pinned', function () {
    const addOrRemoveItemInPinboardStub = stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: PINBOARD_PAGE.CR, id: firstCRID, isPinned: true },
          { type: PINBOARD_PAGE.CR, id: secondCRID, isPinned: true },
        ] }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledTwice();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINBOARD_PAGE.CR,
      id: firstCRID,
      isPinned: true,
    });
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINBOARD_PAGE.CR,
      id: secondCRID,
      isPinned: true,
    });
  });

  it('should handle on pin button with all items are not pinned', function () {
    const addOrRemoveItemInPinboardStub = stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: PINBOARD_PAGE.CR, id: firstCRID, isPinned: false },
          { type: PINBOARD_PAGE.CR, id: secondCRID, isPinned: false },
        ] }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledTwice();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINBOARD_PAGE.CR,
      id: firstCRID,
      isPinned: false,
    });
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINBOARD_PAGE.CR,
      id: secondCRID,
      isPinned: false,
    });
  });

  it('should handle on pin button with not all items are pinned', function () {
    const addOrRemoveItemInPinboardStub = stub();

    const wrapper = mount(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: PINBOARD_PAGE.CR, id: firstCRID, isPinned: true },
          { type: PINBOARD_PAGE.CR, id: secondCRID, isPinned: false },
        ] }
      />
    );

    const childComponent = wrapper.find('.test--classname');
    childComponent.simulate('click');

    addOrRemoveItemInPinboardStub.should.be.calledOnce();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINBOARD_PAGE.CR,
      id: secondCRID,
      isPinned: false,
    });
  });
});
