import React from 'react';
import { shallow } from 'enzyme';

import f from 'utils/tests/f';
import ComplaintsTab from 'components/OfficerPage/ComplaintsTab';
import OfficerAllegationItemContainer from 'containers/Shared/OfficerAllegationItemContainer';


describe('ComplaintsTab component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<ComplaintsTab />);
    wrapper.should.be.ok();
  });

  it('should render OfficerAllegationItemContainer for each complaint', function () {
    const wrapper = shallow(<ComplaintsTab complaints={ f.createBatch(2, 'Allegation') }/>);
    wrapper.find(OfficerAllegationItemContainer).should.have.length(2);
  });
});
