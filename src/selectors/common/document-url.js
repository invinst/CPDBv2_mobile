export default (url) => {
  if (!url) {
    return null;
  }

  return url.replace(/(\.html)$/, '.pdf');
};
