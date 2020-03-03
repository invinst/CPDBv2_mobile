import React from 'react';
import { shallow } from 'enzyme';

import LocationMap from 'components/common/location-map';
import TRRMap from 'components/trr-page/location/trr-map';
import style from 'components/trr-page/location/trr-map.sass';


describe('TRRMap component', function () {

  it('should render location map with trr map marker', function () {
    const wrapper = shallow(<TRRMap lng={ 1.1 } lat={ 1.2 } />);
    const locationMap = wrapper.find(LocationMap);
    locationMap.prop('lng').should.eql(1.1);
    locationMap.prop('lat').should.eql(1.2);
    locationMap.prop('mapboxStyle').should.eql('mapbox://styles/mapbox/light-v9');
    locationMap.prop('customMarkerClassName').should.eql(style.trrMapMarker);
  });
});
