import SimpleEventSystem from 'components/Lib/SimpleEventSystem';
import sinon from 'sinon';
import should from 'should';


describe('SimpleEventSystem', () => {
  describe('#register', () => {
    it('should create new callbacks list if not existing', () => {
      const eventSystem = SimpleEventSystem();
      eventSystem.register('target', 'callback');
      eventSystem.getCallbacks()['target'].should.be.eql(['callback']);
    });

    it('should add new callback to the existing', () => {
      const eventSystem = SimpleEventSystem();
      eventSystem.register('target1', 'callback1');
      eventSystem.register('target2', 'callback2');

      eventSystem.getCallbacks()['target2'].should.be.eql(['callback2']);
    });
  });

  describe('#unregister', () => {
    it('should remove callback from the list', () => {
      const eventSystem = SimpleEventSystem();
      eventSystem.unregister('target');

      eventSystem.getCallbacks()['target'].should.be.eql([]);
    });
  });

  describe('#dispatch', () => {
    it('should call corresponding callback function', () => {
      let eventSystem;
      const callbackObj = {
        'callback'() {
          return 'test';
        }
      };
      const mock = sinon.mock(callbackObj);
      mock.expects('callback').once().returns('test');

      eventSystem = SimpleEventSystem();
      eventSystem.register('target', callbackObj.callback);

      eventSystem.dispatch('target');

      mock.verify();
      mock.restore();
    });
  });
});
