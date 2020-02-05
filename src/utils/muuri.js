/* istanbul ignore next */
import muuri from 'muuri';
import sinon from 'sinon';
import config from 'config';

let _Muuri = muuri;

if (config.appEnv === 'test') {
  const muuriAdd = sinon.spy();
  const muuriRemove = sinon.spy();
  const muuriDestroy = sinon.spy();
  const muuriOn = sinon.spy();
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
