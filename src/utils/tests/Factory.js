const Factory = () => {
  const schemas = {};
  const sequences = {};

  const sequence = key => {
    if (key in sequences) {
      sequences[key] = sequences[key] + 1;
    } else {
      sequences[key] = 1;
    }

    return sequences[key];
  };

  const create = (name, override) => {
    const obj = {};
    const key = '';
    const schema = schemas[name];

    for (key in schema) {
      if (override && key in override) {
        obj[key] = override[key];
      } else {
        obj[key] = schema[key]();
      }
    }

    return obj;
  };

  const createBatch = (numberOfObjects, name, override) => {
    let i = 0;
    const results = [];

    for (i = 0; i < numberOfObjects; i++) {
      results.push(create(name, override));
    }

    return results;
  };

  const define = (name, schema) => {
    schemas[name] = schema;
  };

  const getSchemas = () => Object.keys(schemas);

  return {
    create,
    createBatch,
    define,
    sequence,
    getSchemas
  };
};

export default Factory;
