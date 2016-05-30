// A very quick pub-sub implementation
const SimpleEventSystem = () => {
  const _callbacks = {};

  return {
    'register'(e, callback) {
      if (!_callbacks[e]) {
        _callbacks[e] = [callback];
      } else {
        _callbacks[e].push(callback);
      }
    },

    'unregister'(e) {
      _callbacks[e] = [];
    },

    'dispatch'(target, payload) {
      let i = 0;
      const callbacks = _callbacks[target];

      if (callbacks) {
        for (i; i < callbacks.length; i++) {
          callbacks[i](payload);
        }
      }
    },

    'getCallbacks'() {
      return _callbacks;
    }
  };
};

export default SimpleEventSystem;
