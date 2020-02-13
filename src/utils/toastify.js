/* istanbul ignore next */
import config from 'config';
import { spy, stub } from 'sinon';
import * as _toastify from 'react-toastify';


let _Toastify = _toastify;

if (config.appEnv === 'test') {
  const toastSpy = spy();
  const cssTransitionStub = stub();
  cssTransitionStub.returnsArg(0);
  toastSpy.dismiss = spy();
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionStub,
  };
}

export const Toastify = _Toastify;
