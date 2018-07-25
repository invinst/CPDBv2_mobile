import React from 'react';
import { shallow } from 'enzyme';

import Complainant from 'components/complaint-page/complainant';

describe('Complainant component', function () {
  it('should be renderable', function () {
    const instance = shallow(
      <Complainant complainants={ ['abc'] } />
    );

    instance.find('.complainant-list').should.have.length(1);
  });

  it('should render nothing if there is not data', function () {
    const instance = shallow(
      <Complainant />
    );

    instance.find('.complainant-list').should.have.length(0);
  });
});
