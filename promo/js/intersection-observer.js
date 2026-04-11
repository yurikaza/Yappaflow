/* ============================================
   YAPPAFLOW PROMO — Scroll Animation Controller
   Replaces Framer Motion's whileInView
   ============================================ */

(function () {
  'use strict';

  var SELECTORS = [
    '.yf-animate',
    '.yf-animate-left',
    '.yf-animate-right',
    '.yf-animate-scale'
  ];

  var VISIBLE_CLASS = 'yf-visible';
  var ROOT_MARGIN = '-80px';

  function init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      SELECTORS.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.classList.add(VISIBLE_CLASS);
        });
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add(VISIBLE_CLASS);
            observer.unobserve(entry.target); // once: true
          }
        });
      },
      {
        rootMargin: ROOT_MARGIN,
        threshold: 0.1
      }
    );

    SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        observer.observe(el);
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
