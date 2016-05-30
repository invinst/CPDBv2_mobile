import objectAssign from 'object-assign';
import {EventEmitter} from 'events';
import AppConstants from '../constants/AppConstants';


// TODO: Move this clone to `u`
const cloneObject = obj => {
  let temp, key;

  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  temp = obj.constructor();
  for (key in obj) {
    temp[key] = cloneObject(obj[key]);
  }
  return temp;
};

const Base = state => objectAssign({}, EventEmitter.prototype, {
  _originalState: cloneObject(state),
  _state: state,

  getState() {
    return this._state;
  },

  updateState(key, value) {
    this._state[key] = value;
  },

  addChangeListener(callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  },

  emitChange() {
    this.emit(AppConstants.CHANGE_EVENT);
  },

  recycle() {
    this._state = cloneObject(this._originalState);
  },

  recycleKey(key) {
    this._state[key] = this._originalState[key];
  }
});

export default Base;
