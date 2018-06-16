import React from 'react';
import { shallow } from 'enzyme';
import constants from 'constants';
import { spy } from 'sinon';

import Navbar from 'components/shared/navbar';

describe('<Navbar />', function () {
  it('should render "Back to Home" link by default', function () {
    const wrapper = shallow(<Navbar />);
    const backLink = wrapper.find('Link.left-link');
    backLink.prop('to').should.eql('/');
    backLink.prop('children').should.eql('Back to Home');
  });

  it('should render "Back to Search" link if appropriate backLink prop is provided', function () {
    const wrapper = shallow(<Navbar backLink={ constants.SEARCH_PATH } />);
    const backLink = wrapper.find('Link.left-link');
    backLink.prop('to').should.eql(constants.SEARCH_PATH);
    backLink.prop('children').should.eql('Back to Search');
  });

  it('should not render menu when shareMenuIsOpen is false', function () {
    const wrapper = shallow(<Navbar shareMenuIsOpen={ false } />);
    wrapper.find('.share-menu').exists().should.be.false();
  });

  it('should open share menu when Share button is tapped', function () {
    const spyOpenShareMenu = spy();
    const spyCloseShareMenu = spy();
    const wrapper = shallow(
      <Navbar
        shareMenuIsOpen={ false }
        openShareMenu={ spyOpenShareMenu }
        closeShareMenu={ spyCloseShareMenu }
      />
    );

    const shareButton = wrapper.find('.right-link');
    shareButton.simulate('click');

    spyOpenShareMenu.called.should.be.true();
    spyCloseShareMenu.called.should.be.false();
  });

  it('should close when Share button is tapped again', function () {
    const spyOpenShareMenu = spy();
    const spyCloseShareMenu = spy();
    const wrapper = shallow(
      <Navbar
        shareMenuIsOpen={ true }
        openShareMenu={ spyOpenShareMenu }
        closeShareMenu={ spyCloseShareMenu }
      />
    );

    const shareButton = wrapper.find('.right-link');
    shareButton.simulate('click');

    spyOpenShareMenu.called.should.be.false();
    spyCloseShareMenu.called.should.be.true();
  });

  it('should close Share menu on unmount', function () {
    const spyCloseShareMenu = spy();
    const wrapper = shallow(<Navbar closeShareMenu={ spyCloseShareMenu } />);
    wrapper.instance().componentWillUnmount();
    spyCloseShareMenu.called.should.be.true();
  });

  describe('Share menu', function () {
    beforeEach(function () {
      this.dummyCloseShareMenu = () => {};
      this.wrapper = shallow(
        <Navbar
          shareMenuIsOpen={ true }
          closeShareMenu={ this.dummyCloseShareMenu }
        />
      );
    });

    it('should copy current URL to clipboard & close menu when "Copy Link" is tapped', function () {
      // Delegate this to 3rd-party ClipboardButton components
      const copyLinkButton = this.wrapper.find('ClipboardButton.copy-link');
      copyLinkButton.prop('data-clipboard-text').should.eql(window.location.href);
      copyLinkButton.prop('children').should.eql('Copy Link');
      copyLinkButton.prop('onClick').should.equal(this.dummyCloseShareMenu);
    });

    it('should tweet current URL & close menu when "Tweet" is tapped', function () {
      const tweetLink = this.wrapper.find('a.tweet.item');
      const href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
      tweetLink.prop('href').should.eql(href);
      tweetLink.prop('children').should.containEql('Tweet ');
      tweetLink.prop('onClick').should.equal(this.dummyCloseShareMenu);
    });

    it('should share current URL on facebook & close menu when "Share" is tapped', function () {
      const tweetLink = this.wrapper.find('a.share.item');
      const href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      tweetLink.prop('href').should.eql(href);
      tweetLink.prop('children').should.containEql('Share ');
      tweetLink.prop('onClick').should.equal(this.dummyCloseShareMenu);
    });
  });
});
