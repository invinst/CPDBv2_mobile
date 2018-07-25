import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import ComplaintSummaries from 'components/landing-page/complaint-summaries';

describe('<ComplaintSummaries />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<ComplaintSummaries />);
    wrapper.should.be.ok();
  });

  it('should call requestComplaintSummaries', () => {
    const requestComplaintSummariesSpy = spy();
    mount(
      <ComplaintSummaries
        requestComplaintSummaries={ requestComplaintSummariesSpy }
        complaintSummaries={ [1] }
      />
    );
    requestComplaintSummariesSpy.called.should.be.false();

    requestComplaintSummariesSpy.reset();
    mount(
      <ComplaintSummaries
        requestComplaintSummaries={ requestComplaintSummariesSpy }
      />
    );
    requestComplaintSummariesSpy.called.should.be.true();
  });
});
