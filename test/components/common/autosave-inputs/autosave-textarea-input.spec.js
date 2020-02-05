import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveTextareaInput component', function () {
  it('should add resize event listener when componentDidMount', function () {
    const addEventListenerStub = sinon.stub(window, 'addEventListener');
    const adjustTextareaHeightSpy = sinon.spy(AutosaveTextareaInput.prototype, 'adjustTextareaHeight');
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
    const saveStub = sinon.stub();
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        save={ saveStub }
        value='value'
      />
    );
    const textarea = wrapper.find('textarea');
    textarea.simulate('focus');
    textarea.simulate('change', { target: { value: 'New Description' } });
    textarea.simulate('blur');

    saveStub.should.be.calledWith({ attr: 'description', value: 'New Description' });
  });

  it('should trigger onChange on input change', function () {
    const wrapper = shallow(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
        value='value'
      />
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

    sinon.stub(instance, 'textarea').value({ scrollHeight: 50 });
    instance.handleResize();
    instance.textarea.rows.should.equal(3);
  });
});
