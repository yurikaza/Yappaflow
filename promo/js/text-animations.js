/* ============================================
   YAPPAFLOW PROMO — Scroll Text Animations
   Word-by-word reveal on scroll entry
   ============================================ */

(function () {
  'use strict';

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var STAGGER = 55; // ms between each word

  function wrapWords(el) {
    if (el.dataset.yfWrapped) return;
    el.dataset.yfWrapped = '1';

    // Walk text nodes and wrap each word
    var html = el.innerHTML;
    // Replace text outside tags: split on word boundaries preserving <br> and tags
    el.innerHTML = html.replace(/(<[^>]+>)|([^\s<]+)/g, function (match, tag, word) {
      if (tag) return tag; // keep HTML tags as-is
      return '<span class="yf-word"><span class="yf-word-inner">' + word + '</span></span>';
    });
  }

  function revealWords(el) {
    var words = el.querySelectorAll('.yf-word-inner');
    words.forEach(function (w, i) {
      setTimeout(function () {
        w.parentElement.classList.add('yf-revealed');
      }, i * STAGGER);
    });
  }

  function init() {
    // Target: section headlines and large statement text
    var targets = document.querySelectorAll(
      '.yf-caps-statement, .yf-section-title, .yf-ind-headline'
    );

    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealWords(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    targets.forEach(function (el) {
      wrapWords(el);
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
