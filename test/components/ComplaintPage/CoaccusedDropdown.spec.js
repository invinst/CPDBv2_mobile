import React from 'react';
import { shallow, mount } from 'enzyme';

import CoaccusedDropdown from 'components/ComplaintPage/CoaccusedDropdown';

describe('CoaccusedDropdown component', function () {

  beforeEach(function () {
    this.coaccused = [
      {
        fullName: 'John One',
        id: 11
      },
      {
        fullName: 'John Two',
        id: 22
      }
    ];
  });

  it('should render correctly', function () {
    const wrapper = mount(
      <CoaccusedDropdown
        complaintId={ '1111' }
        activeCoaccusedId={ 11 }
        coaccused={ [this.coaccused[0]] }
        isExpanded={ true }
      />
    );
    wrapper.find('.fullname').text().should.eql('John One');
  });

  it('should render "Viewing" badge on current coaccused', function () {
    const wrapper = mount(
      <CoaccusedDropdown
        complaintId={ '1111' }
        activeCoaccusedId={ 11 }
        coaccused={ this.coaccused }
        isExpanded={ true }
      />
    );

    const rows = wrapper.find('.row');
    rows.length.should.eql(2);

    rows.at(0).text().should.containEql('Viewing');
    rows.at(1).text().should.not.containEql('Viewing');
  });

  it('should render Arrow on other coaccused', function () {
    const wrapper = mount(
      <CoaccusedDropdown
        complaintId={ '1111' }
        activeCoaccusedId={ 11 }
        coaccused={ this.coaccused }
        isExpanded={ true }
      />
    );

    const rows = wrapper.find('.row');
    rows.length.should.eql(2);

    rows.at(0).find('svg').exists().should.be.false();
    rows.at(1).find('svg').exists().should.be.true();
  });

  describe('when expanded={ false }', function () {
    beforeEach(function () {
      this.wrapper = shallow(
        <CoaccusedDropdown
          complaintId={ '1111' }
          activeCoaccusedId={ 11 }
          coaccused={ this.coaccused }
          isExpanded={ false }
        />
      );
      this.styleProp = this.wrapper.find('.coaccused-animation-wrapper').prop('style');
    });

    it('should have height 0', function () {
      this.styleProp.height.should.eql('0px');
    });

    it('should have overflow: hidden', function () {
      this.styleProp.overflow.should.eql('hidden');
    });
  });

  describe('when expanded={ true }', function () {
    beforeEach(function () {
      this.wrapper = shallow(
        <CoaccusedDropdown
          complaintId={ '1111' }
          activeCoaccusedId={ 11 }
          coaccused={ this.coaccused }
          isExpanded={ true }
        />
      );
      this.styleProp = this.wrapper.find('.coaccused-animation-wrapper').prop('style');
    });

    it('should have correctly calculated height', function () {
      const height = 2 * 41 + 7;
      this.styleProp.height.should.eql(`${height}px`);
    });

    it('should have overflow: scroll', function () {
      this.styleProp.overflow.should.eql('scroll');
    });
  });
});
