import React from 'react';
import { shallow } from 'enzyme';

import Investigator from 'components/complaint-page/investigator';

describe('Investigator component', function () {
  it('should be renderable', function () {
    const instance = shallow(
      <Investigator investigators={ [{ percentile: {} }] } />
    );

    instance.find('.investigator-row').should.have.length(1);
  });

  it('should render nothing if there is not data', function () {
    const instance = shallow(
      <Investigator />
    );

    instance.find('.investigator-row').should.have.length(0);
  });
});
