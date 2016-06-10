import AppConstants from 'constants/AppConstants';
import DeviceUtil from 'utils/DeviceUtil';
import u from 'utils/HelperUtil';


const DocumentPresenter = document => {
  const documentType = () => u.fetch(document, 'type', '');

  const documentCloudId = () => u.fetch(document, 'documentcloud_id', '');

  const documentNormalizedTitle = () => u.fetch(document, 'normalized_title', '');

  const documentName = () => {
    const type = documentType();
    return AppConstants.DOCUMENT_NAMES[type] || 'Unknown type';
  };

  const documentStatus = () => {
    const documentId = documentCloudId();
    const requested = u.fetch(document, 'requested', false);

    if (documentId) {
      return 'Available';
    }

    if (requested) {
      return 'Pending';
    }

    return 'Missing';
  };

  const documentAction = () => {
    const STATUS_TO_ACTION = {
      'Available': 'View',
      'Pending': 'Follow',
      'Missing': 'Request'
    };

    const status = documentStatus();
    return STATUS_TO_ACTION[status];
  };

  const makeLinkFor = extension => {
    const linkFormat = 'http://documentcloud.org/documents/{documentId}-{documentNormalizedTitle}.{extension}';

    return u.format(linkFormat, {
      'documentId': documentCloudId(),
      'documentNormalizedTitle': documentNormalizedTitle(),
      'extension': extension
    });
  };

  const documentLink = () => {
    if (DeviceUtil.isiOSDevice()) {
      return makeLinkFor('pdf');
    }

    return makeLinkFor('html');
  };

  return {
    documentName: documentName(),
    documentStatus: documentStatus(),
    documentAction: documentAction(),
    documentLink: documentLink()
  };
};

export default DocumentPresenter;
