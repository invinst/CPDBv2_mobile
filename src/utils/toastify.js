/* istanbul ignore next */
import config from 'config';
import { spy, stub } from 'sinon';
import * as _toastify from 'react-toastify';


let _Toastify = _toastify;

if (config.appEnv === 'test') {
  const toastSpy = spy();
  const cssTransitionSpy = stub();
  cssTransitionSpy.returnsArg(0);
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionSpy,
  };
}

export const Toastify = _Toastify;
