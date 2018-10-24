import React from 'react';

import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import * as NavigationUtil from 'utils/navigation-util';

import SearchNavbar from 'components/search-page/search-navbar';


describe('<SearchNavbar />', function () {

  it('should be renderable', function () {
    const wrapper = shallow(
      <SearchNavbar categories={ [] }/>
    );
    wrapper.should.be.ok();
  });

  it('should make first category active by default', function () {
    const categories = [
      {
        id: 'officers'
      },
      {
        id: 'crs'
      }
    ];
    const wrapper = mount(
      <SearchNavbar
        categories={ categories }
      />
    );

    wrapper.find('button').at(0).hasClass('active').should.be.true();
    wrapper.find('button').at(1).hasClass('active').should.be.false();
  });

  it('should render all the categories with correct names', function () {
    const categories = [
      {
        id: 'officers',
        name: 'Officers',
        filter: 'Officers'
      },
      {
        id: 'crs',
        name: 'CRs',
        filter: 'CRs'
      }
    ];

    const wrapper = mount(
      <SearchNavbar
        categories={ categories }
      />
    );

    wrapper.find('button').at(0).text().should.be.eql('Officers');
    wrapper.find('button').at(1).text().should.be.eql('CRs');
  });

  it('should scroll to the correct position when clicking on the category links', function () {
    const categories = [
      {
        id: 'officers',
        name: 'Officers'
      },
      {
        id: 'crs',
        name: 'CRs'
      }
    ];
    const spyScrollToCategory = spy();
    const spyUpdateActiveCategory = spy();

    const wrapper = mount(
      <SearchNavbar
        categories={ categories }
        scrollToCategory={ spyScrollToCategory }
        updateActiveCategory={ spyUpdateActiveCategory }
      />
    );

    wrapper.find('button').at(0).simulate('click');
    spyScrollToCategory.calledWith('officers').should.be.true();
    spyUpdateActiveCategory.calledWith('officers').should.be.true();

    spyScrollToCategory.resetHistory();
    spyUpdateActiveCategory.resetHistory();

    wrapper.find('button').at(1).simulate('click');
    spyScrollToCategory.calledWith('crs').should.be.true();
    spyUpdateActiveCategory.calledWith('crs').should.be.true();
  });

  describe('chosenCategory-related behaviors', function () {
    beforeEach(function () {
      this.stubInstantScrollToTop = stub(NavigationUtil, 'instantScrollToTop');
    });

    afterEach(function () {
      this.stubInstantScrollToTop.restore();
    });

    it('should not render "clear" button if no single category is currently chosen', function () {
      const categories = [
        {
          id: 'officers'
        },
        {
          id: 'crs'
        }
      ];
      const wrapper = mount(
        <SearchNavbar
          categories={ categories }
        />
      );

      wrapper.find('.clear-icon').exists().should.be.false();
    });

    it('should render "clear" button if a category is currently chosen', function () {
      const clearChosenCategory = spy();

      const wrapper = mount(
        <SearchNavbar
          chosenCategory='crs'
          clearChosenCategory={ clearChosenCategory }
        />
      );

      wrapper.find('.clear-icon').simulate('click');

      clearChosenCategory.calledWith().should.be.true();
      this.stubInstantScrollToTop.calledWith().should.be.true();
    });

    it('should not render category links if only one exists', function () {
      const categories = [
        {
          id: 'officers',
          name: 'Officers',
          filter: 'Officers'
        }
      ];
      const wrapper = mount(
        <SearchNavbar
          categories={ categories }
          activeCategory='officers'
        />
      );

      wrapper.find('.category-link').exists().should.eql(false);
    });
  });
});
