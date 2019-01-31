import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import configureStore from 'stores';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default history;
