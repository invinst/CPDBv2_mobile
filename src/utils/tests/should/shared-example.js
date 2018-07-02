import should from 'should';
import SharedExample from 'utils/tests/shared-example';


should.Assertion.add('behaveLike', function (name) {
  const example = SharedExample.get(name);
  example.apply(this, Array.prototype.slice.call(arguments, 1));
});
