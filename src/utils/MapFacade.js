import 'mapbox.js';
import style from 'mapbox.js/theme/style.css'
import AppConstants from 'constants/AppConstants';


const MapFacade = {
  map: null,
  center: null,

  initialize(domNode, point) {
    const defaultZoom = 16;
    const mapbox = L.mapbox;

    mapbox.accessToken = AppConstants.MAPBOX_TOKEN;
    this.center = [point.y, point.x];
    this.map = mapbox.map(domNode, 'mapbox.streets').setView(this.center, defaultZoom);

    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
  },

  addAccidentPlaceMarker() {
    if (this.map) {
      L.marker(this.center).addTo(this.map);
    }
  },

  addNoAddressPopup() {
    let circle;

    if (this.map) {
      circle = L.circle(this.center, 50, { color: 'red', fillColor: '#f03', fillOpacity: 0.5 }).addTo(this.map);
      circle.bindPopup('<b>Exact Address Not Available</b>').openPopup();
    }
  }
};

export default MapFacade;
