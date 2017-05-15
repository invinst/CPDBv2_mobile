/* eslint-disable react/prop-types,react/self-closing-comp */

import React from 'react';
import should from 'should';  // eslint-disable-line no-unused-vars
import { hasChildren, hasGrandchildren } from 'utils/ComponentUtil';


class div extends React.Component {
  render() {
    return <div>{ this.props.children }</div>;
  }
}

describe('ComponentUtil', () => {

  describe('hasChildren', () => {
    it('should return true when at least 1 child component exists', () => {
      const instance = (
        <div>
          <hr />
        </div>
      );
      hasChildren(instance).should.equal(true);
    });

    it('should return false when there is no child component', () => {
      const instance = (
        <div>
        </div>
      );
      hasChildren(instance).should.equal(false);
    });

    it('should return true when at least 1 grandchild exists', () => {
      const instance = (
        <div>
          <div />
          <div>
            foo
          </div>
        </div>
      );
      hasGrandchildren(instance).should.equal(true);
    });

    it('should return false when there is no grandchild', () => {
      const instance = (
        <div>
          <div />
          <hr />
          <div>
          </div>
        </div>
      );
      hasGrandchildren(instance).should.equal(false);
    });
  });
});
