const SharedExample = () => {
  const examples = {};

  const define = (name, assertion) => {
    if (!(name in examples)) {
      examples[name] = assertion;
    }
  };


  const get = name => examples[name];

  return {
    'define': define,
    'get': get
  };
};

export default SharedExample();
