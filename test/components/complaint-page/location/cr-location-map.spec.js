import React from 'react';
import { shallow } from 'enzyme';

import CRLocationMap from 'components/complaint-page/location/cr-location-map';

describe('<CRLocationMap />', function () {
  it('should be renderable', function () {
    shallow(<CRLocationMap />).should.be.ok();
  });
});
