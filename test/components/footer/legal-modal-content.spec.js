import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import LegalModalContent from 'components/footer/legal-modal-content';


describe('<LegalModalContent />', function () {
  it('should be renderable', function () {
    shallow(<LegalModalContent />).should.be.ok();
  });

  it('should close modal when click on close and confirm button', function () {
    const closeModalSpy = spy();
    const wrapper = shallow(
      <LegalModalContent
        closeModal={ closeModalSpy }/>
    );
    wrapper.find('.close-button-wrapper').simulate('click');
    closeModalSpy.called.should.be.true();
    closeModalSpy.resetHistory();
    wrapper.find('.confirm-button').simulate('click');
    closeModalSpy.called.should.be.true();
  });

  it('should close modal when click on confirm button', function () {
    const openContactSpy = spy();
    const wrapper = shallow(
      <LegalModalContent
        openContact={ openContactSpy }/>
    );
    wrapper.find('.contact-link').simulate('click');
    openContactSpy.called.should.be.true();
  });
});
