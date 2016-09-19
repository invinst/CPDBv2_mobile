import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import f from 'utils/tests/f';
import OfficerAllegationItemContainer from 'containers/Shared/OfficerAllegationItemContainer';
import ToggleComplaintPage from 'components/ComplaintPage/ToggleComplaintPage';


describe('ToggleComplaintPage component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<ToggleComplaintPage />);
    wrapper.should.be.ok();
  });

  it('should render OfficerAllegationItemContainer for each category group', function () {
    const cat1 = f.create('Category', { id: 1 });
    const cat2 = f.create('Category', { id: 2 });
    const officerAllegations = [
      f.create('OfficerAllegation', { cat: cat1 }),
      f.create('OfficerAllegation', { cat: cat2 })
    ];

    const wrapper = shallow(<ToggleComplaintPage officerAllegations={ officerAllegations } />);
    wrapper.find(OfficerAllegationItemContainer).should.have.length(2);
  });

  it('should be call toggleClose on click close button', function () {
    const toggleCloseSpy = spy();

    const wrapper = shallow(<ToggleComplaintPage toggleClose={ toggleCloseSpy }/>);
    wrapper.find('.toggle-container').simulate('click');
    toggleCloseSpy.called.should.be.true();
  });
});
