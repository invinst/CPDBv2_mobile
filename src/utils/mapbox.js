/* istanbul ignore next */
import _mapboxgl from 'mapbox-gl';
import { spy, stub } from 'sinon';
import config from 'config';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaW52aXNpYmxlaW5zdGl0dXRlIiwiYSI6ImNpZ256bXRqMDAwMDBzeGtud3VoZGplNHMifQ.ky2VSGEYU5KritRMArHY-w';
const MAPBOX_API_URL = 'https://api.mapbox.com/styles/v1/mapbox';
const MARKER_URL = 'https://cpdbv21777.blob.core.windows.net/assets/map-marker.png';

_mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

if (config.appEnv === 'test') {
  const addSourceSpy = spy();
  const getSourceSpy = stub().returns(undefined);
  const addLayerSpy = spy();
  const getLayerSpy = stub().returns(undefined);
  const setFilterSpy = spy();
  const addControlSpy = spy();
  const navigationControlSpy = spy();
  const removeSpy = spy();
  const removeMakerSpy = spy();
  const easeToSpy = spy();
  const getZoomStub = stub();
  const setLngLatSpy = spy();
  const setPopupSpy = spy();
  const addToSpy = spy();

  class MockMap {
    constructor() {
      this.addSource = addSourceSpy;
      this.getSource = getSourceSpy;
      this.getZoom = getZoomStub;
      this.addLayer = addLayerSpy;
      this.easeTo = easeToSpy;
      this.getLayer = getLayerSpy;
      this.setFilter = setFilterSpy;
      this.addControl = addControlSpy;
      this.remove = removeSpy;
    }
    on() {
      arguments[arguments.length - 1]();
    }
  }

  class MockMarker {
    constructor(element) {
      this.setLngLat = setLngLatSpy;
      this.addTo = addToSpy;
      this.setPopup = setPopupSpy;
      this.element = element;
      this.remove = removeMakerSpy;
    }
  }

  _mapboxgl.Map = MockMap;
  _mapboxgl.Marker = MockMarker;
  _mapboxgl._addSourceSpy = addSourceSpy;
  _mapboxgl._getSourceSpy = getSourceSpy;
  _mapboxgl._addLayerSpy = addLayerSpy;
  _mapboxgl._getLayerSpy = getLayerSpy;
  _mapboxgl._setFilterSpy = setFilterSpy;
  _mapboxgl._addControlSpy = addControlSpy;
  _mapboxgl._removeSpy = removeSpy;
  _mapboxgl.NavigationControl = navigationControlSpy;
}

const getMapUrl = (lat, lon, width, height, mapStyle, zoom) => [
  MAPBOX_API_URL,
  mapStyle,
  'static',
  `url-${encodeURIComponent(MARKER_URL)}(${lon},${lat})`,
  `${lon},${lat},${zoom},0,0`,
  `${width}x${height}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
].join('/');

export const getComplaintMapUrl = (lat, lon, width, height) => {
  return getMapUrl(lat, lon, width, height, 'streets-v10', 12);
};

export const mapboxgl = _mapboxgl;
