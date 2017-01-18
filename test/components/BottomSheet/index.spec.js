/* eslint-disable no-unused-vars */
import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import BottomSheet from 'components/BottomSheet';

describe('<BottomSheet />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(
      <BottomSheet />
    );
    wrapper.should.be.ok();
  });

  describe('when at root path (no children)', () => {
    it('should not render background, overlay, or sheet', () => {
      const wrapper = shallow(
        <BottomSheet />
      );
      wrapper.find('.background').exists().should.be.false();
      wrapper.find('.overlay').exists().should.be.false();
      wrapper.find('.sheet').exists().should.be.false();
    });
  });

  describe('when at first level (has children but no grandchildren)', () => {
    it('should render background as "cpdp" header', () => {
      const wrapper = shallow(
        <BottomSheet>
          <hr />
        </BottomSheet>
      );
      wrapper.find('.background > .header').text().should.eql('cpdp');
    });

    it('should render overlay', () => {
      const wrapper = shallow(
        <BottomSheet>
          <hr />
        </BottomSheet>
      );
      wrapper.find('.overlay').exists().should.be.true();
    });

    it('should render sheet with children data', () => {
      const wrapper = shallow(
        <BottomSheet>
          <hr />
        </BottomSheet>
      );
      wrapper.find('.sheet').contains(<hr />).should.be.true();
    });
  });

  describe('when at second level (has grandchildren)', () => {
    it('should render first level (children) as background', () => {
      const wrapper = shallow(
        <BottomSheet>
          <div id='child'>
            <hr id='grandchild' />
          </div>
        </BottomSheet>
      );
      wrapper.find('.background > .header').children().first().is('#child')
        .should.be.true();
      wrapper.find('.background > .header').children().first().is('#grandchild')
        .should.be.false();
    });

    it('should render overlay', () => {
      const wrapper = shallow(
        <BottomSheet>
          <div id='child'>
            <hr id='grandchild' />
          </div>
        </BottomSheet>
      );
      wrapper.find('.overlay').exists().should.be.true();
    });

    it('should render sheet with grandchildren data', () => {
      const wrapper = shallow(
        <BottomSheet>
          <div id='child'>
            <hr id='grandchild' />
          </div>
        </BottomSheet>
      );
      wrapper.find('.sheet').children().first().is('#grandchild')
        .should.be.true();
      wrapper.find('.sheet').children().first().is('#child')
        .should.be.false();
    });
  });

});
