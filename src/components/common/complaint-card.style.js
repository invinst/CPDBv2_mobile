import { getComplaintMapUrl } from 'utils/mapbox';


export const mapStyle = (lat, lon, width, height) => {
  return { background: `url("${getComplaintMapUrl(lat, lon, width, height)}") no-repeat center/cover` };
};
