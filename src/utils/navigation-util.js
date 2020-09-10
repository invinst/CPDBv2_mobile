import Scroll from 'react-scroll';

const scroller = Scroll.scroller;

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

export function scrollToElement(element) {
  window.scrollTo(0, element.offsetTop);
}

export function animatedScrollToName(name, options) {
  scroller.scrollTo(name, {
    duration: 1500,
    delay: 100,
    smooth: true,
    ...options,
  });
}

export function getPageYBottomOffset() {
  return window.document.body.offsetHeight - window.pageYOffset;
}

export function scrollByBottomOffset(bottomOffset) {
  window.scrollTo(0, window.document.body.offsetHeight - bottomOffset);
}
