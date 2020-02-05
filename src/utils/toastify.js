/* istanbul ignore next */
import config from 'config';
import sinon from 'sinon';
import * as _toastify from 'react-toastify';


let _Toastify = _toastify;

if (config.appEnv === 'test') {
  const toastSpy = sinon.spy();
  const cssTransitionStub = sinon.stub();
  cssTransitionStub.returnsArg(0);
  toastSpy.dismiss = sinon.spy();
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionStub,
  };
}

export const Toastify = _Toastify;
