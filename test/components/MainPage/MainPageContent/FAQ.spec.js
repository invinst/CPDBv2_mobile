import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import 'factories/FAQFactory';

import FAQ from 'components/MainPage/MainPageContent/FAQ';

describe('<FAQ />', function () {
  it('should render', () => {
    let wrapper = shallow(<FAQ />);
    wrapper.should.be.ok();
  });

  it('should render faq questions', () => {
    const faqs = f.createBatch(2, 'FAQ');
    const faqSection = { faqs: faqs };
    let wrapper = shallow(<FAQ faqSection={ faqSection }/>);
    wrapper.find('.faq-content p').should.have.length(2);
  });

  it('should be invisible if search bar is focused', () => {
    let wrapper = shallow(<FAQ isSearchFocused={ true } />);
    wrapper.find('.faq .hidden').should.have.length(1);
  });

  it('should be visible if search bar is unfocused', () => {
    let wrapper = shallow(<FAQ isSearchFocused={ false } />);
    wrapper.find('.faq .hidden').should.have.length(0);
  })
});
