import React from 'react';
import { shallow } from 'enzyme';

import TwoNodesTimeline from
  'components/ComplaintPage/AgainstSection/AgainstCard/InvestigationTimeline/TwoNodesTimeline';


describe('TwoNodesTimeline component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<TwoNodesTimeline />);
    wrapper.should.be.ok();
  });
});
