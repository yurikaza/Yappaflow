/* ============================================
   YAPPAFLOW PROMO — Industries Hover Effect
   Updates visual card on item hover
   ============================================ */

(function () {
  'use strict';

  var PLATFORMS = {
    shopify:   { name: 'Shopify',    desc: 'E-commerce storefronts',    icon: 'shopping-bag' },
    wordpress: { name: 'WordPress',  desc: 'Themes & plugins',          icon: 'globe' },
    webflow:   { name: 'Webflow',    desc: 'Visual web projects',       icon: 'layout' },
    ikas:      { name: 'IKAS',       desc: 'Turkish e-commerce',        icon: 'home' },
    namecheap: { name: 'Namecheap',  desc: 'Domain registration',       icon: 'globe-2' },
    hostinger: { name: 'Hostinger',  desc: 'Server provisioning',       icon: 'server' },
    whatsapp:  { name: 'WhatsApp',   desc: 'Client messaging',          icon: 'message' },
    instagram: { name: 'Instagram',  desc: 'Social DM intake',          icon: 'camera' }
  };

  function init() {
    var items = document.querySelectorAll('.yf-ind-item');
    var visual = document.querySelector('.yf-ind-visual');
    var nameEl = document.querySelector('.yf-ind-visual-name');
    var descEl = document.querySelector('.yf-ind-visual-desc');

    if (!items.length || !visual) return;

    // Set first item active by default
    if (items[0]) items[0].classList.add('active');

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        var platform = this.getAttribute('data-platform');
        var data = PLATFORMS[platform];
        if (!data) return;

        // Remove active from all
        items.forEach(function (i) { i.classList.remove('active'); });
        this.classList.add('active');

        // Update visual
        visual.setAttribute('data-platform', platform);
        if (nameEl) nameEl.textContent = data.name;
        if (descEl) descEl.textContent = data.desc;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
