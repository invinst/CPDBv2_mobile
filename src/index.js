import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './components/App.react';

const store = configureStore();

// Render the main component into the dom
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
