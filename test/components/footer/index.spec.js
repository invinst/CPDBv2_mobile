import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Modal from 'react-modal';

import * as intercomUtils from 'utils/intercom';
import Footer from 'components/footer';
import LegalModalContent from 'components/footer/legal-modal-content';
import IOSPeek from 'components/common/ios-peek';
import constants from 'constants';


describe('<Footer />', function () {
  it('should be enough content', function () {
    const wrapper = shallow(<Footer />);

    const items = wrapper.find('.item');

    items.at(0).prop('className').should.containEql('legal-item');
    items.at(0).text().should.equal('Legal');

    items.at(1).prop('href').should.equal(constants.INVINST_GITHUB_URL);
    items.at(1).text().should.equal('Github');

    items.at(2).prop('className').should.containEql('contact-item');
    items.at(2).text().should.equal('Contact');

    const invistLink = wrapper.find('.invist-logo-link');
    invistLink.prop('href').should.equal('https://invisible.institute/cpdp');
    invistLink.prop('target').should.equal('_blank');

    const invistLogo = wrapper.find('.invist-logo');
    invistLogo.prop('src').should.equal('/img/invist-logo.svg');
    invistLogo.prop('alt').should.equal('Invisible Institute');

    wrapper.find(IOSPeek).prop('isBottom').should.be.true();
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
    sinon.stub(intercomUtils, 'showIntercomMessages');
    const wrapper = shallow(<Footer />);
    wrapper.find('.contact-item').simulate('click');
    intercomUtils.showIntercomMessages.calledWith(true).should.be.true();
  });
});
