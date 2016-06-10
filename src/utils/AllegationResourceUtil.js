import request from 'superagent';
import AppConstants from 'constants/AppConstants';
import ComplaintPageServerActions from 'actions/ComplaintPage/ComplaintPageServerActions';

const AllegationResourceUtil = {
  get(crid) {
    request.get(AppConstants.ALLEGATION_API_ENDPOINT)
      .query({ crid })
      .end((err, res) => {
        if (res.ok) {
          ComplaintPageServerActions.received(res.body);
        } else {
          ComplaintPageServerActions.failedToReceive(crid);
        }
      });
  }
};

export default AllegationResourceUtil;
