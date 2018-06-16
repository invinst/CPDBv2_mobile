import request from 'superagent';
import AppConstants from 'constants/AppConstants';
import MainPageServerActions from 'actions/MainPage/MainPageServerActions';


let ajax = null;

const SuggestionAPI = {
  // TODO: only trigger the api after threshold, could put it to be default 300ms
  get(query) {
    if (ajax) {
      ajax.abort();
    }

    ajax = request.get(AppConstants.SUGGESTION_API_ENDPOINT)
      .query({ query })
      .end((err, res) => {
        if (res.ok) {
          MainPageServerActions.received(res.body, query);
        } else {
          MainPageServerActions.failedToReceive(query);
        }
      });
  }
};

export default SuggestionAPI;
