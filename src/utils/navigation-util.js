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
    ast(document.documentElement, 0, 100);
  };
}


export function instantScrollToTop() {
  window.scrollTo(0, 0);
}

export function getCurrentScrollPosition() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}

export function instantScrollTo(y) {
  window.scrollTo(0, y);
}

export function getPageYBottomOffset() {
  return window.document.body.offsetHeight - window.pageYOffset;
}

export function scrollByBottomOffset(bottomOffset) {
  window.scrollTo(0, window.document.body.offsetHeight - bottomOffset);
}
