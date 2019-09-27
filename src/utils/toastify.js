/* istanbul ignore next */
import config from 'config';
import { spy } from 'sinon';
import * as _toastify from 'react-toastify';


let _Toastify = _toastify;

if (config.appEnv === 'test') {
  const toastSpy = spy();
  const cssTransitionSpy = spy();
  _Toastify = {
    toast: toastSpy,
    cssTransition: cssTransitionSpy,
  };
}

export const Toastify = _Toastify;
