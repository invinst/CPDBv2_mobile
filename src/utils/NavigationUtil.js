// Go up 1 level in path
export const goUp = function (router, currentPathName) {
  if (currentPathName === '/') {
    return;
  }

  const newPathName = currentPathName.split('/').slice(0, -1).join('/');
  router.push(newPathName);
};


export function animatedScrollTo(element, to, duration) {
  if (duration <= 0) {
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  if (Math.abs(perTick) < 0.5) {
    element.scrollTop = to;
    return;
  }

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop !== to) {
      animatedScrollTo(element, to, duration - 10);
    }
  }, 10);
}


export function scrollToTop(ast=animatedScrollTo) {
  return () => {
    ast(document.body, 0, 100);
  };
}
