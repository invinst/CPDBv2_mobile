import React from 'react';
import { shallow } from 'enzyme';

import Victim from 'components/complaint-page/victim';

describe('Victim component', function () {
  it('should be renderable', function () {
    const instance = shallow(
      <Victim victims={ ['abc'] } />
    );

    instance.find('.victim-list').should.have.length(1);
  });

  it('should render nothing if there is not data', function () {
    const instance = shallow(
      <Victim />
    );

    instance.find('.victim-list').should.have.length(0);
  });
});
