import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';

import FAQ from 'components/MainPage/MainPageContent/FAQ';

describe('<FAQ />', function () {
  it('should render', () => {
    let wrapper = shallow(<FAQ />);
    wrapper.should.be.ok();
  });

  it('should render faq questions', () => {
    const faqs = f.createBatch('FAQ', 2);
    let wrapper = shallow(<FAQ faqSection={ faqs }/>);
    wrapper.find('.faq-content p').should.have.length(2);
  });

  it('should be invisible if topLeft is true', () => {
    let wrapper = shallow(<FAQ topLeft={ true } />);
    wrapper.find('.faq .top-left').should.have.length(1);
  });

  it('should be visible if topLeft is true', () => {
    let wrapper = shallow(<FAQ topLeft={ true } />);
    wrapper.find('.faq .top-left').should.have.length(0);
  })
});
