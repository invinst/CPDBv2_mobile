// Go up 1 level in path
export const goUp = function (router, currentPathName) {
  if (currentPathName === '/') {
    return;
  }

  const newPathName = currentPathName.split('/').slice(0, -1).join('/');
  router.push(newPathName);
};
