/* istanbul ignore next */
import muuri from 'muuri';
import { spy } from 'sinon';
import config from 'config';

let _Muuri = muuri;

if (config.appEnv === 'test') {
  const muuriAdd = spy();
  const muuriRemove = spy();
  const muuriDestroy = spy();
  const muuriOn = spy();
  class MuuriClass {
    constructor() {
      this.add = muuriAdd;
      this.remove = muuriRemove;
      this.on = muuriOn;
      this.destroy = muuriDestroy;
    }
  }

  _Muuri = MuuriClass;
}

export const Muuri = _Muuri;
