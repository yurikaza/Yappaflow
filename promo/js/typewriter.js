/* ============================================
   YAPPAFLOW PROMO — Chat Typewriter Effect
   ============================================ */

(function () {
  'use strict';

  var CHAR_DELAY_MIN = 25;
  var CHAR_DELAY_MAX = 55;
  var MSG_PAUSE = 800;

  var MESSAGES = [
    {
      sender: 'Client',
      type: 'client',
      text: 'Hey, I need a modern e-commerce store. Dark theme, minimal design. Products are handmade ceramics.'
    },
    {
      sender: 'Yappaflow AI',
      type: 'ai',
      text: 'Understood. Generating a Shopify storefront with dark minimal theme, product catalog for handmade ceramics, and checkout flow...'
    },
    {
      sender: 'Client',
      type: 'client',
      text: 'Also need it in Turkish and English. And connect a custom domain.'
    },
    {
      sender: 'Yappaflow AI',
      type: 'ai',
      text: 'Adding i18n for TR/EN. Purchasing domain via Namecheap and configuring DNS. Deploying to production now.'
    }
  ];

  function randomDelay() {
    return CHAR_DELAY_MIN + Math.random() * (CHAR_DELAY_MAX - CHAR_DELAY_MIN);
  }

  function typeMessage(el, text, callback) {
    var textSpan = el.querySelector('.yf-chat-text');
    var cursor = el.querySelector('.yf-chat-cursor');
    if (!textSpan) { if (callback) callback(); return; }

    var index = 0;
    el.classList.add('yf-typed');
    if (cursor) cursor.style.display = 'inline-block';

    function typeNext() {
      if (index < text.length) {
        textSpan.textContent += text.charAt(index);
        index++;
        setTimeout(typeNext, randomDelay());
      } else {
        if (cursor) cursor.style.display = 'none';
        if (callback) setTimeout(callback, MSG_PAUSE);
      }
    }

    typeNext();
  }

  function startTyping(container) {
    var msgElements = container.querySelectorAll('.yf-chat-msg');
    var currentIndex = 0;

    function typeNextMsg() {
      if (currentIndex >= msgElements.length || currentIndex >= MESSAGES.length) return;

      var el = msgElements[currentIndex];
      var msg = MESSAGES[currentIndex];
      currentIndex++;

      typeMessage(el, msg.text, typeNextMsg);
    }

    typeNextMsg();
  }

  // Trigger when showcase section is visible
  function init() {
    var container = document.querySelector('.yf-chat-messages');
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      startTyping(container);
      return;
    }

    var triggered = false;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            startTyping(container);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
