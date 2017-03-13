import should from 'should'; // eslint-disable-line no-unused-vars
import React from 'react';
import { shallow, mount } from 'enzyme';

import OfficerTopLinks from 'components/OfficerPage/OfficerTopLinks';
import constants from 'constants';


describe('OfficerTopLinks component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(
      <OfficerTopLinks />
    );
    wrapper.should.be.ok();
  });

  it('should render summary link', function () {
    const wrapper = shallow(
      <OfficerTopLinks
        id={ 111 }
      />
    );

    const link = wrapper.find('Link.officer-link').filterWhere(
      (w) => w.prop('children') === 'Summary'
    );
    link.prop('to').should.be.eql(`${constants.OFFICER_PATH}/111/summary`);
  });

  it('should render timeline link', function () {
    const wrapper = shallow(
      <OfficerTopLinks
        id={ 111 }
      />
    );

    const link = wrapper.find('Link.officer-link').filterWhere(
      (w) => w.prop('children') === 'Timeline'
    );
    link.prop('to').should.be.eql(`${constants.OFFICER_PATH}/111/timeline`);
  });

  it('should render social-graph link', function () {
    const wrapper = shallow(
      <OfficerTopLinks
        id={ 111 }
      />
    );

    const link = wrapper.find('Link.officer-link').filterWhere(
      (w) => w.prop('children') === 'Social Graph'
    );
    link.prop('to').should.be.eql(`${constants.OFFICER_PATH}/111/social-graph`);
  });

  it('should render active path as a non-link <a> tag with `active` classname', function () {
    const wrapper = shallow(
      <OfficerTopLinks
        id={ 111 }
        currentPath='timeline'
      />
    );

    const link = wrapper.find('Link.officer-link').filterWhere(
      (w) => w.prop('children') === 'Timeline'
    );
    link.exists().should.be.false();

    wrapper.find('a.officer-link.active').text().should.be.eql('Timeline');
  });

});
