import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'web-animations-js';

import configureStore from './stores';
import config from 'config';
import browserHistory from 'utils/history';
import AppContainer from 'containers/app-container';


const store = configureStore();

// init tracking
window.ga('create', config.gaTrackingId, 'auto');
window.Intercom('boot', { 'app_id': config.intercomAppId } );


// Render the main component into the dom
render(
  <Provider store={ store }>
    <ConnectedRouter history={ browserHistory }>
      <AppContainer />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
