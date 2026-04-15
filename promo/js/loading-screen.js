/* ============================================
   YAPPAFLOW PROMO — Loading Screen
   Brief branded intro that exits on load
   ============================================ */

(function () {
  'use strict';

  var loader = document.getElementById('yf-loader');
  if (!loader) return;

  // Respect reduced motion — skip immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.style.display = 'none';
    return;
  }

  function exit() {
    loader.classList.add('yf-loader-exit');
    // Remove from DOM after transition completes
    setTimeout(function () {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 750);
  }

  // Exit once page is fully loaded, minimum 1.1s so animation plays
  var minTime = 1100;
  var startTime = Date.now();

  function maybeExit() {
    var elapsed = Date.now() - startTime;
    var remaining = minTime - elapsed;
    if (remaining <= 0) {
      exit();
    } else {
      setTimeout(exit, remaining);
    }
  }

  if (document.readyState === 'complete') {
    maybeExit();
  } else {
    window.addEventListener('load', maybeExit);
  }
})();
