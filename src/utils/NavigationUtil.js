import constants from 'constants';

// Go up 1 level in path
export const goUp = function (router, currentPathName) {
  if (currentPathName === '/') {
    return;
  }

  const newPathName = currentPathName.split('/').slice(0, -1).join('/');

  // Skip nonexistent routes
  let isSkipped = false;
  constants.NONEXISTENT_ROUTES.forEach((pattern) => {
    if (newPathName.match(pattern)) {
      isSkipped = true;
    }
  });
  if (isSkipped) {
    return goUp(router, newPathName);
  }

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


export function scrollToElement(targetElementSelector, offsetElementSelector) {
  const targetElement = document.querySelector(targetElementSelector);
  if (!targetElement) {
    return;
  }
  const offsetElement = document.querySelector(offsetElementSelector);

  let offset = 0;
  if (offsetElement) {
    offset = offsetElement.offsetHeight;
  }
  document.body.scrollTop = targetElement.offsetTop - offset;
}
