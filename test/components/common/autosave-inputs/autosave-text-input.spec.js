import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import AutosaveTextInput from 'components/common/autosave-inputs/autosave-text-input';


describe('AutosaveTextInput component', function () {
  it('should trigger onBlur on blur', function () {
    const saveStub = stub();
    const wrapper = shallow(
      <AutosaveTextInput
        save={ saveStub }
        fieldType='title'
        value='value'
      />
    );
    const input = wrapper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'New Title' } });
    input.simulate('blur');

    saveStub.should.be.calledWith({ attr: 'title', value: 'New Title' });
  });

  it('should trigger onChange on input change', function () {
    const wrapper = shallow(
      <AutosaveTextInput value='Value'/>
    );
    const input = wrapper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'New value' } });

    const instance = wrapper.instance();
    instance.state.currentValue.should.equal('New value');
  });
});
