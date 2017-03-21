import CollectionUtil from 'utils/CollectionUtil';
import should from 'should';

describe('CollectionUtil', () => {
  describe('pluck', () => {
    it('should pluck field of array of object', () => {
      const items = [
        { 'key': 1 },
        { 'key': 2 }
      ];

      const pluckedByKey = CollectionUtil.pluck(items, 'key');
      pluckedByKey.should.have.length(2);
      pluckedByKey.should.be.eql([1, 2]);
    });
  });

  describe('#isSameField', () => {
    it('should return true if collection has the same field value', () => {
      const items = [
        { 'field': 1 },
        { 'field': 1 },
        { 'field': 1 }
      ];

      const isSame = CollectionUtil.isSameField(items, 'field');
      isSame.should.be.equal(true);
    });

    it('should return false if collection has different field value', () => {
      const items = [
        { 'field': 1 },
        { 'field': 1 },
        { 'field': 2 }
      ];

      const isSame = CollectionUtil.isSameField(items, 'field');
      isSame.should.be.equal(false);
    });

  });

  describe('#isSameAllFields', () => {
    it('should return true if collection has the same value for all specified fields', () => {
      const items = [
        { 'field1': 1, 'field2': 2 },
        { 'field1': 1, 'field2': 2 }
      ];

      const isSame = CollectionUtil.isSameAllFields(items, ['field1', 'field2']);
      isSame.should.be.equal(true);
    });

    it('should return false if collection has any different value in specified fields', () => {
      const items = [
        { 'field1': 1, 'field2': 1 },
        { 'field1': 1, 'field2': 2 }
      ];

      const isSame = CollectionUtil.isSameAllFields(items, ['field1', 'field2']);
      isSame.should.be.equal(false);
    });
  });

  describe('#first', () => {
    it('should return null if collection is empty', () => {
      const items = [];

      const first = CollectionUtil.first(items);
      should(first).be.exactly(null);
    });

    it('should return first element if collection is not empty', () => {
      const items = [1, 2];
      CollectionUtil.first(items).should.be.equal(1);
    });
  });

  describe('#groupBy', () => {
    it('should group items by specify function', () => {
      const items = [1, 1, 2];
      const result = CollectionUtil.groupBy(items, item => item);
      result.should.be.deepEqual({ 1: [1, 1], 2: [2] });
    });
  });

});
