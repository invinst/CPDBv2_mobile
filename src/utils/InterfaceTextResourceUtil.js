import request from 'superagent';
import AppConstants from 'constants/AppConstants';
import InterfaceTextActions from 'actions/Shared/InterfaceTextActions';
import InterfaceTextUtil from 'utils/InterfaceTextUtil';


const InterfaceTextResourceUtil = {
  get() {
    request.get(AppConstants.INTERFACE_TEXT_API_ENDPOINT).end((err, res) => {
      let results, interfaceTexts, interfaceText, i;
      if (res.ok) {
        results = res.body.results;
        interfaceTexts = {};

        for (i = 0; i < results.length; i++) {
          interfaceText = results[i];
          interfaceTexts[interfaceText['key']] = interfaceText['text'];
        }
        InterfaceTextUtil.saveToLocalStorage(interfaceTexts);
        InterfaceTextActions.getInterfaceTextsSucessfully(interfaceTexts);
      } else {
        InterfaceTextActions.failedToGetInterfaceTexts(err);
      }
    });
  }
};

export default InterfaceTextResourceUtil;
