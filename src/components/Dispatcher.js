import { Dispatcher } from 'flux';
import { stub } from 'sinon';

const AppDispatcher = new Dispatcher();
let _callbacks;


 // stub AppDispatcher if we're running tests
if (global.Mocha !== undefined) {
  _callbacks = [];

  AppDispatcher.register = callback => {
    _callbacks.push(callback);
    return _callbacks.length - 1;
  };

  AppDispatcher.getCallback = index => _callbacks[index];

  stub(AppDispatcher, 'dispatch');
  stub(AppDispatcher, 'waitFor');
}

export default AppDispatcher;
