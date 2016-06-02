import AppConstants from 'constants/AppConstants';
import HelperUtil from 'utils/HelperUtil';


const OfficerUtil = {
  getColorLevelClass(prefix, allegationCount) {
    let i;

    if (allegationCount < 0) {
      return '';
    }

    // FIXME: Refactor this function
    for (i = 0; i < AppConstants.OFFICER_COMPLAINT_COUNT_RANGE.length; i++) {
      if (allegationCount >= AppConstants.OFFICER_COMPLAINT_COUNT_RANGE[i]) {
        return HelperUtil.format('{prefix}-{id}', { 'id': i, prefix });
      }
    }
  }
};

export default OfficerUtil;
