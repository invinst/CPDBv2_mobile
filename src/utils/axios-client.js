import axios from 'axios';

export const REQUEST_CANCEL_MESSAGE = 'Cancelled by user';

export const clientConfig = {
  responseType: 'json',
  withCredentials: true,
};

const client = axios.create(clientConfig);
export default client;
