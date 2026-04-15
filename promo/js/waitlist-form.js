/* ============================================
   YAPPAFLOW PROMO — Waitlist Form Handler
   Squarespace-ready with localStorage fallback
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
        btn.style.opacity = '0.7';
      }

      // Try Squarespace native form submission
      submitToSquarespace(email, function (success) {
        if (success) {
          showSuccess(form, successEl);
        } else {
          // Fallback: store locally and still show success
          storeLocally(email);
          showSuccess(form, successEl);
        }
      });
    });
  }

  function submitToSquarespace(email, callback) {
    // On Squarespace, the form submission endpoint is available
    // via window.Static.SQUARESPACE_CONTEXT
    var sqContext = window.Static && window.Static.SQUARESPACE_CONTEXT;

    if (!sqContext) {
      // Not on Squarespace (local preview) — fallback
      callback(false);
      return;
    }

    // Squarespace newsletter form submission
    var formData = new FormData();
    formData.append('email', email);

    // Get CSRF token from Squarespace page
    var crumb = sqContext.csrfToken || '';
    if (crumb) {
      formData.append('crumb', crumb);
    }

    fetch('/api/form/FormSubmission', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(function (res) {
      callback(res.ok);
    })
    .catch(function () {
      callback(false);
    });
  }

  function storeLocally(email) {
    try {
      var emails = JSON.parse(localStorage.getItem('yf_waitlist') || '[]');
      emails.push({ email: email, date: new Date().toISOString() });
      localStorage.setItem('yf_waitlist', JSON.stringify(emails));
    } catch (err) {
      // Silent fail
    }
  }

  function showSuccess(form, successEl) {
    form.style.display = 'none';
    if (successEl) {
      successEl.classList.add('yf-show');
    }
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
