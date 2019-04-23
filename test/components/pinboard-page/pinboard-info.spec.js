import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import PinboardInfo from 'components/pinboard-page/pinboard-info';
import AutosaveTextInput from 'components/common/autosave-inputs/autosave-text-input';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('<PinboardInfo />', function () {
  it('should not render when pinboard is empty', function () {
    const wrapper = mount(
      <PinboardInfo pinboard={ {} }/>
    );

    wrapper.find(AutosaveTextInput).exists().should.be.false();
    wrapper.find(AutosaveTextareaInput).exists().should.be.false();
  });

  it('should not render correctly', function () {
    const updatePinboardInfoStub = stub();
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    const wrapper = mount(
      <PinboardInfo
        pinboard={ {} }
        updatePinboardInfo={ updatePinboardInfoStub }
      />
    );
    wrapper.state('isLoading').should.be.true();
    wrapper.setProps({ pinboard: pinboard });
    wrapper.state('isLoading').should.be.false();

    const titleTextInput = wrapper.find(AutosaveTextInput);
    const descriptionTextareaInput = wrapper.find(AutosaveTextareaInput);
    titleTextInput.prop('save').should.eql(updatePinboardInfoStub);
    descriptionTextareaInput.prop('save').should.eql(updatePinboardInfoStub);
    titleTextInput.prop('value').should.eql('This is pinboard title');
    descriptionTextareaInput.prop('value').should.eql('This is pinboard description');
  });
});
