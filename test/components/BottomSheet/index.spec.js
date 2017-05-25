/* eslint-disable no-unused-vars */
import should from 'should';
import React from 'react';
import { shallow } from 'enzyme';

import BottomSheet from 'components/BottomSheet';
import constants from 'constants';

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

  describe('when at search/ path', () => {
    it('should not render background or overlay', () => {
      const wrapper = shallow(
        <BottomSheet location={ { pathname: 'search/' } }>
          <hr />
        </BottomSheet>
      );
      wrapper.find('.background').exists().should.be.false();
      wrapper.find('.overlay').exists().should.be.false();
      wrapper.find('.sheet').exists().should.be.true();
    });
  });

  describe('calculateSheetStyle', () => {
    it('should return correct values when path name is not \'search\'', () => {
      const location = {
        pathname: 'somepath'
      };
      const wrapper = shallow(
        <BottomSheet location={ location }/>
      );
      const instance = wrapper.instance();
      const result = instance.calculateSheetStyle();

      const minHeight = window.innerHeight - (constants.TOP_MARGIN - constants.BOTTOM_PADDING);

      result.should.be.eql({
        minHeight: `${minHeight}px`,
        paddingBottom: `${constants.BOTTOM_PADDING}px`
      });
    });

    it('should return correct values when path name is \'search\'', () => {
      const location = {
        pathname: 'search/'
      };
      const wrapper = shallow(
        <BottomSheet location={ location }/>
      );
      const instance = wrapper.instance();
      const result = instance.calculateSheetStyle();

      result.should.be.eql({
        minHeight: `${window.innerHeight - constants.TOP_MARGIN}px`,
        paddingBottom: '0px'
      });
    });
  });

  describe('renderSheetBottomPadding', () => {
    it('should return null when path name is \'search\'', () => {
      const location = {
        pathname: 'search/'
      };
      const wrapper = shallow(
        <BottomSheet location={ location }/>
      );
      const instance = wrapper.instance();
      const result = instance.renderSheetBottomPadding();

      should(result).null();
    });

    it('should return correct values when path name is not \'search\'', () => {
      const location = {
        pathname: 'somepath'
      };
      const wrapper = shallow(
        <BottomSheet location={ location }/>
      );
      const instance = wrapper.instance();
      const result = instance.renderSheetBottomPadding();

      result.should.be.eql(<div className='sheet-bottom-padding'></div>);
    });
  });

});
