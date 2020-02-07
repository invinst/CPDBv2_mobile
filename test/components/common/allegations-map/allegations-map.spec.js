import React from 'react';
import { mount, shallow } from 'enzyme';
import { times, cloneDeep } from 'lodash';
import sinon from 'sinon';
import ReactDOMServer from 'react-dom/server';
import should from 'should';

import AllegationsMap, { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import LoadingSpinner from 'components/common/loading-spinner';
import MarkerTooltip from 'components/common/allegations-map/marker-tooltip';
import { mapboxgl } from 'utils/mapbox';
import Legend from 'components/common/allegations-map/legend';
import mapStyles from 'components/common/allegations-map/allegations-map.sass';


describe('Map component', function () {
  const legend = {
    allegationCount: 20,
    sustainedCount: 3,
    useOfForceCount: 1,
  };
  const markerGroups = {
    crs: [
      {
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
        }],
      },
      {
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
      },
    ],
    trrs: [
      {
        point: {
          lat: 42.212567,
          lon: -87.280291,
        },
        kind: 'FORCE',
        id: '1234',
        category: 'Use of Force Report',
      },
    ],
  };

  beforeEach(function () {
    mapboxgl._resetHistory();
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if props are changed', function () {
      const newLegend = {
        allegationCount: 18,
        sustainedCount: 5,
        useOfForceCount: 3,
      };
      const newMarkerGroups = {
        crs: [
          {
            point: {
              lat: 43.012567,
              lon: -89.680291,
            },
            kind: 'CR',
            finding: 'Sustained',
            id: 'C123456',
            category: 'False Arrest',
            coaccused: 5,
            victims: [{
              gender: 'male',
              race: 'White',
              age: 32,
            }],
          },
        ],
        trrs: [],
      };

      const wrapper = shallow(
        <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
        { disableLifecycleMethods: true },
      );

      const instance = wrapper.instance();
      instance.shouldComponentUpdate({ legend: newLegend, markerGroups }).should.be.true();
      instance.shouldComponentUpdate({ legend, markerGroups: newMarkerGroups }).should.be.true();
      instance.shouldComponentUpdate({ legend: newLegend, markerGroups: newMarkerGroups }).should.be.true();
    });

    it('should return false if props are unchanged', function () {
      const wrapper = shallow(
        <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
        { disableLifecycleMethods: true },
      );

      const instance = wrapper.instance();
      instance.shouldComponentUpdate(
        { legend: cloneDeep(legend), markerGroups: cloneDeep(markerGroups) }
      ).should.be.false();
    });
  });

  describe('componentDidUpdate', function () {
    it('should call resetMap and addMapLayersOnStyleLoaded if next props clearAllMarkers is true', function () {
      const resetMapStub = sinon.stub(AllegationsMap.prototype, 'resetMap');
      const addMapLayersOnStyleLoadedStub = sinon.stub(AllegationsMap.prototype, 'addMapLayersOnStyleLoaded');
      const newMarkers = {
        crs: [],
        trrs: [
          {
            point: {
              lat: 42.212567,
              lon: -87.280291,
            },
            kind: 'FORCE',
            id: '1234',
            category: 'Use of Force Report',
          },
        ],
      };

      const wrapper = shallow(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

      wrapper.setProps({ legend, markerGroups: newMarkers, clearAllMarkers: true });

      resetMapStub.should.be.called();
      addMapLayersOnStyleLoadedStub.should.be.calledWith(newMarkers);
    });

    it('should only call addMapLayersOnStyleLoaded if next props clearAllMarkers is false', function () {
      const addMapLayersOnStyleLoadedStub = sinon.stub(AllegationsMap.prototype, 'addMapLayersOnStyleLoaded');
      const newMarkerGroups = {
        crs: [],
        trrs: [
          {
            point: {
              lat: 42.212567,
              lon: -87.280291,
            },
            kind: 'FORCE',
            id: '1234',
            category: 'Use of Force Report',
          },
        ],
      };

      const wrapper = shallow(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

      wrapper.setProps({ legend, markerGroups: newMarkerGroups, clearAllMarkers: false });

      addMapLayersOnStyleLoadedStub.should.be.calledWith(newMarkerGroups);
    });
  });

  it('should render officer map and legend', function () {
    const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

    wrapper.find(LoadingSpinner).exists().should.be.false();
    wrapper.find('.test--map').should.have.length(1);
    wrapper.find('.test--legend').should.have.length(1);
  });

  context('WithSpinner', function () {
    it('should render only loading spinner if requesting is true ', function () {
      const wrapper = mount(<AllegationsMapWithSpinner legend={ legend } requesting={ true } />);

      const loadingSpinner = wrapper.find(LoadingSpinner);
      loadingSpinner.prop('className').should.equal(mapStyles.allegationMapLoading);

      wrapper.find(AllegationsMap).exists().should.be.false();
      wrapper.find(Legend).exists().should.be.false();
      wrapper.find('.map-tab').exists().should.be.false();
    });

    it('should not render loading spinner if requesting is false', function () {
      const wrapper = mount(<AllegationsMapWithSpinner legend={ legend } requesting={ false } />);

      wrapper.find(LoadingSpinner).exists().should.be.false();
      wrapper.find(Legend).exists().should.be.true();
      wrapper.find(AllegationsMap).exists().should.be.true();
      wrapper.find('.map-tab').exists().should.be.true();
    });
  });

  it('should call addMapLayersOnStyleLoaded when componentDidMount', function () {
    const addMapLayersOnStyleLoadedStub = sinon.stub(AllegationsMap.prototype, 'addMapLayersOnStyleLoaded');
    const createMarker = (index) => ({
      point: {
        lat: 42.012567,
        lon: -87.680291,
      },
      id: index.toString(),
      kind: 'CR',
    });
    const markerGroups = {
      crs: times(3, createMarker),
      trrs: [],
    };

    mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

    addMapLayersOnStyleLoadedStub.should.be.calledWith(markerGroups);
  });

  describe('addMapLayer', function () {
    it('should bind click event when calling addMapLayer', function () {
      sinon.stub(AllegationsMap.prototype, 'addMapLayersOnStyleLoaded');
      const crMarkers = [
        {
          point: {
            lat: 42.012567,
            lon: -87.680291,
          },
          kind: 'CR',
          finding: 'Not Sustained',
          id: '123456',
          category: 'False Arrest',
          date: '2007-12-05',
        },
        {
          point: {
            lat: 42.112567,
            lon: -87.180291,
          },
          kind: 'CR',
          pointType: 'SUSTAINED-CR',
          finding: 'Sustained',
          id: '654321',
          category: 'False Arrest',
          date: '2008-12-05',
        },
      ];

      const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

      const instance = wrapper.instance();
      const mapOnStub = sinon.stub(instance.map, 'on');

      instance.addMapLayer('crs', crMarkers);
      instance.map.addSource.should.be.calledWith(
        'layer-0',
        {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {
                  id: '123456',
                  kind: 'CR',
                  pointType: 'CR',
                  date: '2007-12-05',
                  category: 'False Arrest',
                  url: '/complaint/123456/',
                },
                geometry: {
                  type: 'Point',
                  coordinates: [-87.680291, 42.012567],
                },
                id: 0,
              },
              {
                type: 'Feature',
                properties: {
                  id: '654321',
                  kind: 'CR',
                  pointType: 'SUSTAINED-CR',
                  date: '2008-12-05',
                  category: 'False Arrest',
                  url: '/complaint/654321/',
                },
                geometry: {
                  type: 'Point',
                  coordinates: [-87.180291, 42.112567],
                },
                id: 1,
              },
            ],
          },
        },
      );

      instance.map.addLayer.should.be.called();
      const addLayerArg = instance.map.addLayer.getCall(0).args[0];
      addLayerArg['id'].should.eql('layer-0');
      addLayerArg['type'].should.eql('circle');
      addLayerArg['source'].should.eql('layer-0');

      const mouseClickArgs = mapOnStub.getCall(0).args;
      mouseClickArgs[0].should.eql('click');
      mouseClickArgs[1].should.eql('layer-0');
      mouseClickArgs[2].should.eql(instance.openTooltip);
    });

    it('should not add new layer if markers data is empty', function () {
      sinon.stub(AllegationsMap.prototype, 'addMapLayersOnStyleLoaded');

      const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

      const instance = wrapper.instance();
      instance.addMapLayer('crs', []);

      instance.map.addSource.should.not.be.called();
      instance.map.addLayer.should.not.be.called();
    });

    it('should addLayer with correct aboveLayerName', function () {
      sinon.stub(AllegationsMap.prototype, 'addMapLayersOnStyleLoaded');
      const crMarkers1 = [
        {
          point: {
            lat: 42.012567,
            lon: -87.680291,
          },
          kind: 'CR',
          finding: 'Not Sustained',
          id: '123456',
          category: 'False Arrest',
          date: '2007-12-05',
        },
      ];
      const crMarkers2 = [
        {
          point: {
            lat: 42.112567,
            lon: -87.180291,
          },
          kind: 'CR',
          pointType: 'SUSTAINED-CR',
          finding: 'Sustained',
          id: '654321',
          category: 'False Arrest',
          date: '2008-12-05',
        },
      ];
      const crMarkers3 = [
        {
          point: {
            lat: 46.112567,
            lon: -89.180291,
          },
          kind: 'CR',
          pointType: 'SUSTAINED-CR',
          finding: 'Sustained',
          id: '789123',
          category: 'False Arrest',
          date: '2009-08-05',
        },
      ];
      const trrMarkers = [
        {
          point: {
            lat: 42.212567,
            lon: -87.280291,
          },
          kind: 'FORCE',
          id: '1234',
          category: 'Use of Force Report',
        },
      ];

      const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

      const instance = wrapper.instance();
      instance.addMapLayer('crs', crMarkers1);
      should(instance.map.addLayer.getCall(0).args[1]).be.undefined();

      instance.map.addLayer.resetHistory();
      instance.addMapLayer('crs', crMarkers2);
      instance.map.addLayer.getCall(0).args[1].should.equal('layer-0');

      instance.map.addLayer.resetHistory();
      instance.addMapLayer('trrs', trrMarkers);
      should(instance.map.addLayer.getCall(0).args[1]).be.undefined();

      instance.map.addLayer.resetHistory();
      instance.addMapLayer('crs', crMarkers3);
      instance.map.addLayer.getCall(0).args[1].should.equal('layer-2');
    });
  });

  it('should return correct url when calling getUrl', function () {
    const crMarker = {
      id: 'C123456',
      kind: 'CR',
      category: 'False Arrest',
    };
    const trrMarker = {
      id: '123456',
      kind: 'FORCE',
      category: 'Use of Force',
    };

    const wrapper = shallow(
      <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
      { disableLifecycleMethods: true },
    );

    const instance = wrapper.instance();
    instance.getUrl(crMarker).should.equal('/complaint/C123456/');
    instance.getUrl(trrMarker).should.equal('/trr/123456/');
  });

  it('should return correct marker uid when calling markerUid', function () {
    const crMarker = {
      id: 'C123456',
      kind: 'CR',
      category: 'False Arrest',
    };

    const wrapper = shallow(
      <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
      { disableLifecycleMethods: true },
    );

    const instance = wrapper.instance();
    instance.markerUid(crMarker).should.equal('CR-C123456');
  });

  it('should add MarkerTooltip to map when calling openTooltip', function () {
    const event = {
      features: [
        {
          geometry: {
            coordinates: [-87.680291, 42.012567],
          },
          properties: {
            id: 'C123456',
            kind: 'CR',
            url: '/complaint/C123456/',
            date: '2007-12-05',
            category: 'False Arrest',
          },
        },
      ],
    };

    const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);

    const instance = wrapper.instance();
    const tooltip = (<MarkerTooltip date='2007-12-05' category='False Arrest' url='/complaint/C123456/'/>);
    instance.openTooltip(event);
    instance.tooltip.setLngLat.should.be.calledWith([-87.680291, 42.012567]);
    instance.tooltip.setHTML.should.be.calledWith(ReactDOMServer.renderToString(tooltip));
    instance.tooltip.addTo.should.be.calledWith(instance.map);
  });

  it('should return initial data when calling initMapData', function () {
    const wrapper = shallow(
      <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
      { disableLifecycleMethods: true },
    );

    const instance = wrapper.instance();
    instance.initMapData();
    instance.layerNames.should.eql([]);
    instance.currentMarkers.should.eql(new Set());
    instance.mapboxglLayerIndex.should.eql(0);
    instance.firstLayer.should.eql({});
  });

  it('should reset the map when calling resetMap', function () {
    const initMapDataSpy = sinon.spy(AllegationsMap.prototype, 'initMapData');

    const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);
    const instance = wrapper.instance();
    initMapDataSpy.should.be.calledOnce();
    initMapDataSpy.resetHistory();
    instance.map.isStyleLoaded.returns(true);
    instance.layerNames = ['layer-0'];

    instance.resetMap();

    initMapDataSpy.should.be.calledOnce();
    instance.map.removeLayer.should.be.calledWith('layer-0');
    instance.map.removeSource.should.be.calledWith('layer-0');
  });

  it('should return correct data when calling mapMarkersData', function () {
    const crMarkers = [
      {
        point: {
          lat: 42.012567,
          lon: -87.680291,
        },
        kind: 'CR',
        finding: 'Not Sustained',
        id: '123456',
        category: 'False Arrest',
        date: '2007-12-05',
      },
      {
        point: {
          lat: 42.112567,
          lon: -87.180291,
        },
        kind: 'CR',
        pointType: 'SUSTAINED-CR',
        finding: 'Sustained',
        id: '654321',
        category: 'False Arrest',
        date: '2008-12-05',
      },
    ];
    const wrapper = shallow(
      <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
      { disableLifecycleMethods: true },
    );

    const instance = wrapper.instance();
    instance.mapMarkersData(crMarkers).should.eql([
      {
        type: 'Feature',
        properties: {
          id: '123456',
          kind: 'CR',
          pointType: 'CR',
          date: '2007-12-05',
          category: 'False Arrest',
          url: '/complaint/123456/',
        },
        geometry: {
          type: 'Point',
          coordinates: [-87.680291, 42.012567],
        },
        id: 0,
      },
      {
        type: 'Feature',
        properties: {
          id: '654321',
          kind: 'CR',
          pointType: 'SUSTAINED-CR',
          date: '2008-12-05',
          category: 'False Arrest',
          url: '/complaint/654321/',
        },
        geometry: {
          type: 'Point',
          coordinates: [-87.180291, 42.112567],
        },
        id: 1,
      },
    ]);
  });

  it('should call addMapLayer when calling addMapLayers', function () {
    const addMapLayerStub = sinon.stub(AllegationsMap.prototype, 'addMapLayer');
    const wrapper = shallow(
      <AllegationsMap legend={ legend } markerGroups={ markerGroups } />,
      { disableLifecycleMethods: true },
    );
    const instance = wrapper.instance();
    addMapLayerStub.resetHistory();

    instance.addMapLayers(markerGroups);
    addMapLayerStub.should.be.calledTwice();
  });

  it('should add map layer when calling addMapLayersOnStyleLoaded', function () {
    const addMapLayersStub = sinon.stub(AllegationsMap.prototype, 'addMapLayers');
    const wrapper = mount(<AllegationsMap legend={ legend } markerGroups={ markerGroups } />);
    const instance = wrapper.instance();
    addMapLayersStub.resetHistory();

    instance.map.isStyleLoaded.returns(true);
    instance.addMapLayersOnStyleLoaded(markerGroups);
    addMapLayersStub.should.be.calledOnce();
  });

  it('should call addControl when component render', function () {
    const wrapper = mount(
      <AllegationsMap legend={ legend } markerGroups={ markerGroups } attributionControlPosition='bottom-left' />
    );
    const instance = wrapper.instance();

    instance.map.addControl.should.be.calledTwice();
    const attributionControlArgs = instance.map.addControl.getCall(0).args;
    (attributionControlArgs[0] instanceof mapboxgl.AttributionControl).should.be.true();
    attributionControlArgs[1].should.equal('bottom-left');

    const navigationControllArgs = instance.map.addControl.getCall(1).args;
    (navigationControllArgs[0] instanceof mapboxgl.NavigationControl).should.be.true();
    navigationControllArgs[1].should.equal('top-left');
  });
});
