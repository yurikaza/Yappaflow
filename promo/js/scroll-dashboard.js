/* ============================================
   YAPPAFLOW PROMO — Dashboard Scroll Reveal
   Scales dashboard from 0.88 → 1.0 on scroll
   ============================================ */

(function () {
  'use strict';

  function init() {
    var dash = document.querySelector('.yf-dash');
    if (!dash) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dash.classList.add('yf-dash-revealed');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      dash.classList.add('yf-dash-revealed');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            dash.classList.add('yf-dash-revealed');
            observer.unobserve(dash);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(dash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
