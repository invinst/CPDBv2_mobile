import createRequestingReducer from 'reducers/common/requesting';
import { APP_CONFIG_FETCH_START, APP_CONFIG_FETCH_FAILURE, APP_CONFIG_FETCH_SUCCESS } from 'actions/common/app-config';


export default createRequestingReducer(APP_CONFIG_FETCH_START, APP_CONFIG_FETCH_SUCCESS, APP_CONFIG_FETCH_FAILURE);
