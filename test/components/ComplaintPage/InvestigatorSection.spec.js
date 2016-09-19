import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import InvestigatorSection from 'components/ComplaintPage/InvestigatorSection';


describe('InvestigatorSection component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<InvestigatorSection />);
    wrapper.should.be.ok();
  });

  it('should render investigator card if available', function () {
    const allegation = f.create('Allegation');
    const wrapper = shallow(<InvestigatorSection allegation={ allegation }/>);
    wrapper.find('.investigator-card').should.have.length(1);
  });
});
