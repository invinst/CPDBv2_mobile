import axios from 'axios';
import config from 'config';


// TODO: Currently we use both v1 and v2 APIs, so, we create different axios-client for it
export const clientConfig = {
  baseURL: config.baseUrlV2,
  responseType: 'json'
};

const client = axios.create(clientConfig);
export default client;
