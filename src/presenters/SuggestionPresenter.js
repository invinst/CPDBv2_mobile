import HelperUtil from 'utils/HelperUtil';


const SuggestionPresenter = suggestion => {

  const text = () => HelperUtil.fetch(suggestion, 'text', '');

  const url = () => HelperUtil.fetch(suggestion, 'url', '');

  const resource = () => HelperUtil.fetch(suggestion, 'resource', '');

  const resourceKey = () => HelperUtil.fetch(suggestion, 'resource_key', '');

  const getMeta = () => HelperUtil.fetch(suggestion, 'meta', '');

  const uniqueKey = () => HelperUtil.format('{resource}-{resourceKey}', {'resource': resource(), 'resourceKey': resourceKey() });

  return {
    text: text(),
    url: url(),
    resource: resource(),
    resourceKey: resourceKey(),
    meta: getMeta(),
    uniqueKey: uniqueKey()
  };
};

export default SuggestionPresenter;
