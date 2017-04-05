import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import ClearableInput from 'components/SearchPage/ClearableInput';

describe('<ClearableInput />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(
      <ClearableInput />
    );
    wrapper.should.be.ok();
  });

  it('should not render clear-icon when value is empty', () => {
    const wrapper = shallow(
      <ClearableInput
        value={ '' }
      />
    );

    wrapper.find('.clear-icon').exists().should.be.false();
  });

  it('should render "clear text" button when value is not empty', () => {
    const wrapper = shallow(
      <ClearableInput
        value={ 'a' }
      />
    );

    wrapper.find('.clear-icon').exists().should.be.true();
  });

  it('should call onClear() prop and re-focus input element when user taps "clear text" button', () => {
    const spyFocus = spy();
    const spyOnClear = spy();

    const wrapper = shallow(
      <ClearableInput
        value={ 'just end me' }
        onClear={ spyOnClear }
      />
    );
    wrapper.instance().inputElement = { focus: spyFocus };

    wrapper.find('.clear-icon').simulate('click');

    spyOnClear.calledOnce.should.be.true();
    spyFocus.calledOnce.should.be.true();
  });
});
