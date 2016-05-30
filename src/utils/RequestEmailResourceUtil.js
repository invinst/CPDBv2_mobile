import request from 'superagent';
import AppConstants from 'constants/AppConstants';
import RequestActions from 'actions/ComplaintPage/RequestActions';


const RequestEmailResourceUtil = {
  post(email, documentId) {

    request.post(AppConstants.REQUEST_EMAIL_API_EMAIL)
      .send({'email': email, 'document_id': documentId})
      .end((err, res) => {
        if (res.ok) {
          RequestActions.requestSuccess();
        } else {
          RequestActions.requestFail(res.body);
        }
      });

  }
};

export default RequestEmailResourceUtil;
