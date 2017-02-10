import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import FAQDetail from 'components/FAQPage/FAQDetail';

describe('<FAQDetail />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<FAQDetail requestFAQ={ () => {} }/>);
    wrapper.should.be.ok();
  });

  it('should call requestFAQ on mount', () => {
    const requestFAQ = spy();
    shallow(
      <FAQDetail requestFAQ={ requestFAQ } />
    );

    requestFAQ.called.should.be.true();
  });

  it('should render null if faq is undefined', () => {
    const wrapper = shallow(
      <FAQDetail requestFAQ={ () => {} }/>
    );

    should(wrapper.type()).equal(null);
  });

  it('should render null if faq is not loaded', () => {
    const wrapper = shallow(
      <FAQDetail requestFAQ={ () => {} } faq={ { loaded: false } }/>
    );

    should(wrapper.type()).equal(null);
  });

  it('should render FAQ detail if data is valid', () => {
    const faq = {
      loaded: true,
      question: ['foo', 'bar'],
      answer: ['p1', 'p2']
    };
    const wrapper = shallow(
      <FAQDetail requestFAQ={ () => {} } faq={ faq }/>
    );

    wrapper.find('.question').text().should.be.equal('foo - bar');

    const answer = wrapper.find('.answer');
    answer.childAt(0).text().should.be.equal('p1');
    answer.childAt(1).text().should.be.equal('p2');
  });
});
