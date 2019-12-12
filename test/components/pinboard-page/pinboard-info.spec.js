import React from 'react';
import { mount } from 'enzyme';
import { stub, spy } from 'sinon';

import PinboardInfo from 'components/pinboard-page/pinboard-info';
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
    const autosaveTextareaInputs = wrapper.find(AutosaveTextareaInput);
    autosaveTextareaInputs.should.have.length(2);

    const pinboardTitle = autosaveTextareaInputs.at(0);
    pinboardTitle.prop('className').should.eql('pinboard-title');
    pinboardTitle.prop('value').should.eql('This is pinboard title');
    pinboardTitle.prop('placeholder').should.eql('Give your pinboard a title');
    pinboardTitle.prop('fieldType').should.eql('title');
    pinboardTitle.prop('save').should.eql(updatePinboardInfoStub);
    pinboardTitle.prop('textareaLineHeight').should.eql(31);

    const pinboardDescription = autosaveTextareaInputs.at(1);
    pinboardDescription.prop('className').should.eql('pinboard-description');
    pinboardDescription.prop('value').should.eql('This is pinboard description');
    pinboardDescription.prop('placeholder').should.eql(
      'When you\\u2019re ready, add a description for your pinboard here'
    );
    pinboardDescription.prop('fieldType').should.eql('description');
    pinboardDescription.prop('save').should.eql(updatePinboardInfoStub);
    pinboardDescription.prop('textareaLineHeight').should.eql(16);

    const title = wrapper.find('.pinboard-title');
    const description = wrapper.find('.pinboard-description');
    title.text().should.eql('This is pinboard title');
    description.text().should.eql('This is pinboard description');
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
