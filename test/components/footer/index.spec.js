import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import Modal from 'react-modal';

import * as intercomUtils from 'utils/intercom';
import Footer from 'components/footer';
import LegalModalContent from 'components/footer/legal-modal-content';


describe('<Footer />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<Footer />);
    wrapper.should.be.ok();
  });

  it('should open legal modal when click on the Legal text', function () {
    const wrapper = shallow(<Footer />);
    wrapper.find('.legal-item').simulate('click');
    wrapper.state('legalModalIsOpen').should.be.true();
    wrapper.find(Modal).prop('isOpen').should.be.true();
  });

  it('should update state when close modal', function () {
    const wrapper = shallow(<Footer />);
    wrapper.find('.legal-item').simulate('click');
    wrapper.state('legalModalIsOpen').should.be.true();
    wrapper.find(LegalModalContent).props().closeModal();
    wrapper.state('legalModalIsOpen').should.be.false();
  });

  it('should show intercom messages when click on Contact item', function () {
    stub(intercomUtils, 'showIntercomMessages');
    const wrapper = shallow(<Footer />);
    wrapper.find('.contact-item').simulate('click');
    intercomUtils.showIntercomMessages.calledWith(true).should.be.true();
    intercomUtils.showIntercomMessages.restore();
  });
});
