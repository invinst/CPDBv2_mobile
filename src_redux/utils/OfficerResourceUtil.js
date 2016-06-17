import request from 'superagent';
import AppConstants from 'constants/AppConstants';
import OfficerPageServerActions from 'actions/OfficerPage/OfficerPageServerActions';


const OfficerResourceUtil = {
  get(id) {
    request.get(AppConstants.OFFICER_API_ENDPOINT)
      .query({ pk: id })
      .end((err, res) => {
        if (res.ok) {
          OfficerPageServerActions.received(res.body);
        } else {
          OfficerPageServerActions.failedToReceive(id);
        }
      });
  }
};

export default OfficerResourceUtil;
