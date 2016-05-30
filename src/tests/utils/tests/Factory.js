import Factory from 'utils/tests/Factory';

require('should');


describe('Factory', () => {
  it('should have no schemas first initial', () => {
    Factory().getSchemas().should.have.length(0);
  });

  it('should register a schema to schema list when we define a schema', () => {
    const factory = Factory();

    factory.define('something', 'something');
    factory.getSchemas().should.have.length(1);
  });

  it('should return an object based on what it is already defined', () => {
    const factory = Factory();
    factory.define('schema', {
      'property'() {
        return 1;
      }
    });

    factory.create('schema').should.be.eql({
      'property': 1
    });
  });

  it('should return an empty object when there is no corresponding schema', () => {
    Factory().create('something').should.be.eql({});
  });

  it('should return an object with override value', () => {
    const factory = Factory();
    factory.define('schema', {
      'property'() {
        return 1;
      }
    });

    factory.create('schema', {
      'property': 2
    }).should.be.eql({'property': 2});
  });

  it('should return an object with key null if we override it with null value', () => {
    const factory = Factory();
    factory.define('schema', {
      'property'() {
        return 1;
      }
    });

    factory.create('schema', {
      'property': null
    }).should.be.eql({'property': null});
  });

  it('should return multiple objects when calling create as batch', () => {
    const factory = Factory();
    factory.define('schema', {
      'property'() {
        return 1;
      }
    });

    factory.createBatch(2, 'schema').should.be.eql([{'property': 1}, {'property': 1}]);
  });

  it('#sequence(): should return a sequence', () => {
    const factory = Factory();
    factory.sequence('somekey').should.be.equal(1);
    factory.sequence('somekey').should.be.equal(2);
    factory.sequence('otherkey').should.be.equal(1);
  });
});
