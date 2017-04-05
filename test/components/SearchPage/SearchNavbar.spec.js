import should from 'should';
import React from 'react';

import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';

import SearchNavbar from 'components/SearchPage/SearchNavbar';


describe('<SearchNavbar />', function () {
  it('should be renderable', () => {
    const wrapper = shallow(
      <SearchNavbar categories={ [] }/>
    );
    wrapper.should.be.ok();
  });

  it('should make first category active by default', () => {
    const categories = [
      {
        id: 'officers'
      },
      {
        id: 'faqs'
      }
    ];
    const wrapper = mount(
      <SearchNavbar
        categories={ categories }
      />
    );

    wrapper.find('button').at(0).hasClass('active').should.be.true()
    wrapper.find('button').at(1).hasClass('active').should.be.false()
  });

  it('should render all the categories with correct names', () => {
    const categories = [
      {
        id: 'officers',
        name: 'Officers'
      },
      {
        id: 'faqs',
        name: 'FAQs'
      }
    ];

    const wrapper = mount(
      <SearchNavbar
        categories={ categories }
      />
    );

    wrapper.find('button').at(0).text().should.be.eql('Officers');
    wrapper.find('button').at(1).text().should.be.eql('FAQs');
  });

  it('should scroll to the correct position when clicking on the category links', () => {
    const categories = [
      {
        id: 'officers',
        name: 'Officers'
      },
      {
        id: 'faqs',
        name: 'FAQs'
      }
    ];
    const spyScrollToCategory = spy();

    const wrapper = mount(
      <SearchNavbar
        categories={ categories }
        scrollToCategory={ spyScrollToCategory }
      />
    );

    wrapper.find('button').at(0).simulate('click');
    spyScrollToCategory.calledWith('officers').should.be.true();
    spyScrollToCategory.reset()

    wrapper.find('button').at(1).simulate('click');
    spyScrollToCategory.calledWith('faqs').should.be.true();
  });
});
