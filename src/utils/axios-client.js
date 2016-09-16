import axios from 'axios';
import config from 'config';


export const clientConfig = {
  baseURL: config.baseUrl,
  responseType: 'json'
};

const client = axios.create(clientConfig);
export default client;
