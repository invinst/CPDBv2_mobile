import { getStreetMapUrl } from 'utils/mapbox';


export const mapStyle = (lat, lon, width, height) => {
  return { background: `url("${getStreetMapUrl(lat, lon, width, height)}") no-repeat center/cover` };
};
