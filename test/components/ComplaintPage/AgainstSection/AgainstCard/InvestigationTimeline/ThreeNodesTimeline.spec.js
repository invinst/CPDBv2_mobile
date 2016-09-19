import React from 'react';
import { shallow } from 'enzyme';

import ThreeNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/ThreeNodesTimeline';


describe('ThreeNodesTimeline component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<ThreeNodesTimeline />);
    wrapper.should.be.ok();
  });
});
