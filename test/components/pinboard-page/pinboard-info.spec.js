import React from 'react';
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';

import PinboardInfo from 'components/pinboard-page/pinboard-info';
import AutosaveTextInput from 'components/common/autosave-inputs/autosave-text-input';
import AutosaveTextareaInput from 'components/common/autosave-inputs/autosave-textarea-input';


describe('<PinboardInfo />', function () {
  it('should render correctly', function () {
    const updatePinboardInfoStub = stub();
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    const wrapper = mount(
      <PinboardInfo
        pinboard={ pinboard }
        updatePinboardInfo={ updatePinboardInfoStub }
      />
    );

    const titleTextInput = wrapper.find(AutosaveTextInput);
    const descriptionTextareaInput = wrapper.find(AutosaveTextareaInput);
    titleTextInput.prop('save').should.eql(updatePinboardInfoStub);
    descriptionTextareaInput.prop('save').should.eql(updatePinboardInfoStub);
    titleTextInput.prop('value').should.eql('This is pinboard title');
    descriptionTextareaInput.prop('value').should.eql('This is pinboard description');
  });

  it('should replace location history when title is updated', function () {
    spy(window.history, 'replaceState');

    const updatePinboardInfoStub = stub();
    const pinboard = {
      id: '66ef1560',
      url: '/pinboard/66ef1560/this-is-pinboard-title/',
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    const wrapper = mount(
      <PinboardInfo
        pinboard={ pinboard }
        updatePinboardInfo={ updatePinboardInfoStub }
      />
    );

    const newPinboard = {
      id: '66ef1560',
      url: '/pinboard/66ef1560/new-pinboard-title/',
      title: 'New pinboard title',
      description: 'This is pinboard description',
    };
    wrapper.setProps({ pinboard: newPinboard, updatePinboardInfo: updatePinboardInfoStub });

    const args = window.history.replaceState.getCall(0).args;
    args[2].should.equal('/pinboard/66ef1560/new-pinboard-title/');

    window.history.replaceState.resetHistory();
    const newDescriptionPinboard = {
      id: '66ef1560',
      url: '/pinboard/66ef1560/new-pinboard-title/',
      title: 'New pinboard title',
      description: 'New pinboard description',
    };
    wrapper.setProps({ pinboard: newDescriptionPinboard, updatePinboardInfo: updatePinboardInfoStub });

    window.history.replaceState.should.not.be.called();

    window.history.replaceState.restore();
  });
});
