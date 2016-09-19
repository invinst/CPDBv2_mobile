import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import AgainstSection from 'components/ComplaintPage/AgainstSection';
import AgainstCard from 'components/ComplaintPage/AgainstSection/AgainstCard';


describe('AgainstSection component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<AgainstSection />);
    wrapper.should.be.ok();
  });

  it('should render OfficerCard for each officer in officerAllegations', function () {
    const officerAllegations = f.createBatch(2, 'OfficerAllegation');
    const wrapper = shallow(<AgainstSection officerAllegations={ officerAllegations }/>);
    wrapper.find(AgainstCard).should.have.length(2);
  });
});
