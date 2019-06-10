import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('AutosaveTextareaInput component', function () {
  it('should add resize event listener when componentDidMount', function () {
    const addEventListenerStub = stub(window, 'addEventListener');
    const wrapper = mount(
      <AutosaveTextareaInput
        textareaLineHeight={ 16 }
        fieldType='description'
      />
    );
    const instance = wrapper.instance();
    addEventListenerStub.should.be.calledWith('resize', instance.handleResize);
    addEventListenerStub.restore();
  });

  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
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

    const textareaStub = stub(instance, 'textarea').value({ scrollHeight: 42, rows: 0 });
    instance.handleResize();
    instance.textarea.rows.should.equal(2);
    textareaStub.restore();
  });
});
