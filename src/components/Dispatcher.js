import {Dispatcher} from 'flux';
const AppDispatcher = new Dispatcher();
// let sinon, _callbacks;


// stub AppDispatcher if we're running tests
// if (global.Mocha !== undefined) {
//   sinon = require('sinon');
//   _callbacks = [];

//   AppDispatcher.register = callback => {
//     _callbacks.push(callback);
//     return _callbacks.length - 1;
//   };

//   AppDispatcher.getCallback = index => _callbacks[index];

//   sinon.stub(AppDispatcher, 'dispatch');
//   sinon.stub(AppDispatcher, 'waitFor');
// }

export default AppDispatcher;
