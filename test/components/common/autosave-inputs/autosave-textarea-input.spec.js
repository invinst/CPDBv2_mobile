import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';

import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveTextareaInput component', function () {
  it('should add resize event listener when componentDidMount', function () {
    const addEventListenerStub = stub(window, 'addEventListener');
    const adjustTextareaHeightSpy = spy(AutosaveTextareaInput.prototype, 'adjustTextareaHeight');
    const wrapper = mount(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    const instance = wrapper.instance();
    adjustTextareaHeightSpy.should.be.calledWith(instance.textarea);
    addEventListenerStub.should.be.calledWith('resize', instance.handleResize);
  });

  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
    const onBlurStub = stub();
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        save={ saveStub }
        onBlur={ onBlurStub }
        value='value'
      />,
      { disableLifecycleMethods: true },
    );
    const textarea = wrapper.find('textarea').first();
    textarea.simulate('focus');
    textarea.simulate('change', { target: { value: 'New Description' } });
    textarea.simulate('blur');

    saveStub.should.be.calledWith({ attr: 'description', value: 'New Description' });
    onBlurStub.should.be.called();
  });

  it('should trigger onChange on input change', function () {
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        value='value'
      />,
      { disableLifecycleMethods: true },
    );
    const textarea = wrapper.find('textarea');
    textarea.simulate('focus');
    textarea.simulate('change', { target: { value: 'New value' } });

    const instance = wrapper.instance();
    instance.state.currentValue.should.equal('New value');
  });

  it('should update number of rows when resize', function () {
    const wrapper = mount(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    const instance = wrapper.instance();

    stub(instance, 'textarea').value({ scrollHeight: 50 });
    instance.handleResize();
    instance.textarea.rows.should.equal(3);
  });

  describe('autoFocus is true', function () {
    it('should call textarea.focus() on componentDidMount', function () {
      const componentDidMountStub = stub(AutosaveTextareaInput.prototype, 'componentDidMount');
      const wrapper = mount(
        <AutosaveTextareaInput
          autoFocus={ true }
          textareaLineHeight={ 16 }
          value={ '' }
          fieldType='description'
        />
      );
      const textAreaFocusSpy = spy(wrapper.instance().textarea, 'focus');
      componentDidMountStub.restore();
      wrapper.instance().componentDidMount();
      textAreaFocusSpy.should.be.calledOnce();
    });
  });
});
