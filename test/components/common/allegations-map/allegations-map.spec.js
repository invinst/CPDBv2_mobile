import React from 'react';
import { mount } from 'enzyme';
import { mapboxgl } from 'utils/mapbox';

import AllegationsMap, { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import Legend from 'components/common/allegations-map/legend';
import LoadingSpinner from 'components/common/loading-spinner';
import mapStyles from 'components/common/allegations-map/allegations-map.sass';


describe('Map component', function () {
  const legend = {
    allegationCount: 20,
    sustainedCount: 3,
    useOfForceCount: 1,
  };
  const markers = [{
    point: {
      lat: 42.012567,
      lon: -87.680291,
    },
    kind: 'CR',
    finding: 'Not Sustained',
    id: '123456',
    category: 'False Arrest',
    coaccused: 2,
    victims: [{
      gender: 'male',
      race: 'White',
      age: 32,
    }]
  }, {
    point: {
      lat: 42.112567,
      lon: -87.180291,
    },
    kind: 'CR',
    finding: 'Sustained',
    id: '654321',
    category: 'False Arrest',
    coaccused: 1,
    victims: [{
      gender: 'male',
      race: 'White',
      age: 32,
    }],
  }, {
    point: {
      lat: 42.212567,
      lon: -87.280291,
    },
    kind: 'FORCE',
    id: '1234',
    category: 'Use of Force Report',
  }];

  it('should render officer map and legend', function () {
    const wrapper = mount(<AllegationsMap legend={ legend } markers={ markers } />);

    wrapper.find(LoadingSpinner).exists().should.be.false();
    wrapper.find('.test--map').should.have.length(1);
    wrapper.find('.test--legend').should.have.length(1);
  });

  it('should rerender', function () {
    const wrapper = mount(<AllegationsMap legend={ legend } markers={ markers } />);
    wrapper.find('.test--map').should.have.length(1);
    wrapper.find('.test--legend').should.have.length(1);

    wrapper.update();
    wrapper.find('.test--map').should.have.length(1);
    wrapper.find('.test--legend').should.have.length(1);
    const marker = new mapboxgl.Marker();
    marker.remove.callCount.should.equal(3);
  });

  context('WithSpinner', function () {
    it('should render only loading spinner if requesting is true ', function () {
      const wrapper = mount(<AllegationsMapWithSpinner legend={ legend } requesting={ true } />);

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(mapStyles.allegationMapLoading);

      wrapper.find(AllegationsMap).should.have.length(0);
      wrapper.find(Legend).should.have.length(0);
      wrapper.find('map-tab').should.have.length(0);
    });
  });
});
