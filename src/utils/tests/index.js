import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import RootReducer from 'reducers/root-reducer';
import browserHistory from 'utils/history';
import configuredAxiosMiddleware from 'middleware/configured-axios-middleware';

export function mountWithRouter(node, options) {
  return mount(<MemoryRouter>{ node }</MemoryRouter>, options);
}

export function createTestStore(initialState) {
  return createStore(RootReducer(browserHistory), initialState, applyMiddleware(configuredAxiosMiddleware));
}
