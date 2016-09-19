import axios from 'axios';


export const clientConfig = {
  responseType: 'json'
};

const client = axios.create(clientConfig);
export default client;
