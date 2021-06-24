export const scrollTo = function (to, duration, element) {
  let start = element.scrollTop + 0.25 * element.scrollHeight,
    change = to - start,
    startTs = performance.now(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function (ts) {
      var currentTime = ts - startTs;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

  requestAnimationFrame(animateScroll);
};
