import React from 'react';
import { shallow } from 'enzyme';

import AccusedOfficers from 'components/complaint-page/accused-officers';


describe('AccusedOfficers component', function () {
  it('should be renderable', function () {
    shallow(<AccusedOfficers />).should.be.ok();
  });

  it('should not render show all button if officers count is smaller than 3', function () {
    const wrapper = shallow(
      <AccusedOfficers officers={ ['1', '2'] } />
    );

    wrapper.find('.show-all').should.have.length(0);
  });

  it('should render show all button if officers count is bigger than 3', function () {
    const wrapper = shallow(
      <AccusedOfficers officers={ ['1', '2', '3'] } />
    );

    wrapper.find('.show-all').should.have.length(1);
  });

  it('should show all officers when click on show all button', function () {
    const wrapper = shallow(
      <AccusedOfficers officers={ ['1', '2', '3'] } />
    );

    wrapper.find('.show-all').simulate('click');
    wrapper.find('.show-all').should.have.length(0);
    wrapper.find('.coaccusals').hasClass('expanded').should.be.true();
  });
});
