import React from 'react';
import { shallow } from 'enzyme';

import RelatedOfficersTab from 'components/OfficerPage/RelatedOfficersTab';
import RelatedOfficerItem from 'components/OfficerPage/RelatedOfficersTab/RelatedOfficerItem';
import NoRelatedOfficer from 'components/OfficerPage/RelatedOfficersTab/NoRelatedOfficer';


describe('RelatedOfficersTab component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<RelatedOfficersTab />);
    wrapper.should.be.ok();
  });

  it('should render NoRelatedOfficer if there is no coAccused', function () {
    const wrapper = shallow(<RelatedOfficersTab coAccused={ [] }/>);
    wrapper.find(NoRelatedOfficer).should.have.length(1);
  });

  it('should render RelatedOfficerItem for each coAccused', function () {
    const wrapper = shallow(<RelatedOfficersTab coAccused={ [{}, {}] }/>);
    wrapper.find(RelatedOfficerItem).should.have.length(2);
  });
});
