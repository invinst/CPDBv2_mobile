import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import TopOfficersByAllegation from 'components/landing-page/top-officers-by-allegation';

describe('<TopOfficersByAllegation />', () => {
  it('should be renderable', () => {
    const wrapper = shallow(<TopOfficersByAllegation />);
    wrapper.should.be.ok();
  });

  it('should call requestTopOfficersByAllegation', () => {
    const requestTopOfficersByAllegationSpy = spy();
    mount(
      <TopOfficersByAllegation
        requestTopOfficersByAllegation={ requestTopOfficersByAllegationSpy }
        topOfficersByAllegation={ [{ percentile: {} }] }
      />
    );
    requestTopOfficersByAllegationSpy.called.should.be.false();

    requestTopOfficersByAllegationSpy.reset();
    mount(
      <TopOfficersByAllegation
        requestTopOfficersByAllegation={ requestTopOfficersByAllegationSpy }
      />
    );
    requestTopOfficersByAllegationSpy.called.should.be.true();
  });
});
