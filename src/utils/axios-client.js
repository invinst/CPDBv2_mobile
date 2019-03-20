import axios from 'axios';


export const clientConfig = {
  responseType: 'json',
  withCredentials: true,
};

const client = axios.create(clientConfig);
export default client;
