/* ============================================
   YAPPAFLOW PROMO — Waitlist Form Handler
   Works with Squarespace native forms
   ============================================ */

(function () {
  'use strict';

  function initForm(form) {
    var input = form.querySelector('.yf-input');
    var btn = form.querySelector('.yf-btn-primary');
    var successEl = form.parentElement.querySelector('.yf-form-success');
    var btnText = btn ? btn.textContent : 'Join Waitlist';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = input ? input.value.trim() : '';
      if (!email || !isValidEmail(email)) {
        shakeInput(input);
        return;
      }

      // Loading state
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Joining...';
      }

      // Simulate Squarespace form submission
      // In production, this submits to Squarespace's /api/form/FormSubmission endpoint
      // For now, it shows success after a brief delay
      // Replace this with actual Squarespace form integration
      setTimeout(function () {
        // Success
        form.style.display = 'none';
        if (successEl) {
          successEl.classList.add('yf-show');
        }

        // Store locally as backup
        try {
          var emails = JSON.parse(localStorage.getItem('yf_waitlist') || '[]');
          emails.push({ email: email, date: new Date().toISOString() });
          localStorage.setItem('yf_waitlist', JSON.stringify(emails));
        } catch (err) {
          // Silent fail
        }
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeInput(input) {
    if (!input) return;
    input.style.borderColor = '#ef4444';
    input.style.animation = 'none';
    input.offsetHeight; // Force reflow
    input.style.animation = 'yf-shake 0.4s ease';
    setTimeout(function () {
      input.style.borderColor = '';
      input.style.animation = '';
    }, 600);
  }

  // Add shake keyframe
  var style = document.createElement('style');
  style.textContent =
    '@keyframes yf-shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }';
  document.head.appendChild(style);

  function init() {
    document.querySelectorAll('.yf-waitlist-form').forEach(initForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
