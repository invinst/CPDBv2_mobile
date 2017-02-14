import S from 'string';
import config from 'config';


export const v1Url = function (endpoint) {
  return S('{{baseUrl}}{{endpoint}}').template({
    'baseUrl': config.baseUrlV1,
    'endpoint': endpoint
  }).s;
};

export const v2Url = function (endpoint) {
  return S('{{baseUrl}}{{endpoint}}').template({
    'baseUrl': config.baseUrlV2,
    'endpoint': endpoint
  }).s;
};

export const v2v2Url = function (endpoint) {
  return S('{{baseUrl}}{{endpoint}}').template({
    'baseUrl': config.baseUrlV2V2,
    'endpoint': endpoint
  }).s;
};
