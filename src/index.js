import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'web-animations-js';

import configureStore from './stores';
import App from './components/app';
import config from 'config';


const store = configureStore();

// init tracking
window.ga('create', config.gaTrackingId, 'auto');
window.Intercom('boot', { 'app_id': config.intercomAppId } );


// Render the main component into the dom
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
