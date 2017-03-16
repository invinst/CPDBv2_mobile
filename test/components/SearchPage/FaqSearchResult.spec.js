import should from 'should';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import constants from 'constants';

import FaqSearchResult from 'components/SearchPage/FaqSearchResult';

describe('<FaqSearchResult />', () => {

  it('should render faq correctly', () => {
    const faq = {
      id: '2',
      question: 'foo'
    };

    const wrapper = mount(
      <FaqSearchResult
        faq={ faq }
        saveToRecent={ () => {} }
      />
    );

    const href = `${constants.FAQ_PATH}/2`;
    const faqLink = wrapper.find('Link');

    faqLink.exists().should.be.true();
    faqLink.hasClass('faq').should.be.true();
    faqLink.prop('to').should.be.eql(href);
    faqLink.text().should.eql('foo');
  });

  it('should dispatch "saveToRecent" action when clicked', () => {
    const spySaveToRecent = spy();
    const faq = {
      id: '3',
      question: 'foo'
    };

    const wrapper = shallow(
      <FaqSearchResult
        faq={ faq }
        saveToRecent={ spySaveToRecent }
      />
    );
    const faqLink = wrapper.find('Link');

    faqLink.simulate('click');
    spySaveToRecent.calledWith({
      type: 'FAQ',
      title: 'foo',
      url: `${constants.FAQ_PATH}/3`
    }).should.be.true();
  });

});
