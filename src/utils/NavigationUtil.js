// Go up 1 level in path
export const goUp = function (router, currentPathName) {
  if (currentPathName === '/') {
    return;
  }

  const newPathName = currentPathName.split('/').slice(0, -1).join('/');
  router.push(newPathName);
};


export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}


export function scrollToTop() {
  scrollTo(document.body, 0, 100);
}
