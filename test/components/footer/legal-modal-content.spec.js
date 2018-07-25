import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import LegalModalContent from 'components/footer/legal-modal-content';


describe('<LegalModalContent />', () => {
  it('should be renderable', () => {
    shallow(<LegalModalContent />).should.be.ok();
  });

  it('should close modal when click on close and confirm button', () => {
    const closeModalSpy = spy();
    const wrapper = shallow(
      <LegalModalContent
        closeModal={ closeModalSpy }/>
    );
    wrapper.find('.close-button-wrapper').simulate('click');
    closeModalSpy.called.should.be.true();
    closeModalSpy.reset();
    wrapper.find('.confirm-button').simulate('click');
    closeModalSpy.called.should.be.true();
  });

  it('should close modal when click on confirm button', () => {
    const openContactSpy = spy();
    const wrapper = shallow(
      <LegalModalContent
        openContact={ openContactSpy }/>
    );
    wrapper.find('.contact-link').simulate('click');
    openContactSpy.called.should.be.true();
  });
});
