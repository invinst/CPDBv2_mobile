import DeviceUtil from 'utils/DeviceUtil';
import u from 'utils/HelperUtil';


const MediaPresenter = media => {
  const type = () => {
    return u.fetch(media, 'file_type', '');
  };

  const makeDocumentUrlFor = extension => {
    const linkFormat = 'http://documentcloud.org/documents/{documentId}-{documentNormalizedTitle}.{extension}';

    return u.format(linkFormat, {
      'documentId': media['additional_info']['documentcloud_id'],
      'documentNormalizedTitle': media['additional_info']['normalized_title'],
      'extension': extension
    });
  };

  const documentUrl = () => {
    if (DeviceUtil.isiOSDevice()) {
      return makeDocumentUrlFor('pdf');
    }

    return makeDocumentUrlFor('html');
  };

  const url = () => {
    if (u.fetch(media, 'additional_info.documentcloud_id')) {
      return documentUrl();
    }
    return u.fetch(media, 'url', '');
  };

  const title = () => {
    return u.fetch(media, 'title', '');
  };

  return {
    title: title(),
    url: url(),
    type: type()
  };
};

export default MediaPresenter;
