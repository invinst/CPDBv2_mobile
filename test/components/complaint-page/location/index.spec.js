import React from 'react';
import { shallow } from 'enzyme';

import Location from 'components/complaint-page/location';
import CRLocationMap from 'components/complaint-page/location/cr-location-map';

describe('<Location />', function () {
  it('should not render map if there is no point data', function () {
    const wrapper = shallow(<Location point={ null } />);
    wrapper.find(CRLocationMap).should.have.length(0);
  });

  it('should render map if there is point data', function () {
    const wrapper = shallow(<Location point={ { lat: 1.0, lon: 0.1 } } />);
    wrapper.find(CRLocationMap).should.have.length(1);
  });
});
