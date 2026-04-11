/* ============================================
   YAPPAFLOW PROMO — Voice Wave Canvas Animation
   Adapted from WaterCanvas.tsx pattern
   ============================================ */

(function () {
  'use strict';

  var ACCENT = { r: 0, g: 240, b: 255 };
  var WAVE_COUNT = 4;
  var BASE_SPEED = 0.015;

  function initVoiceWave(canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var raf = null;
    var time = 0;
    var isVisible = true;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    function drawWave(w, h, offset, amplitude, frequency, alpha, speed) {
      ctx.beginPath();
      var centerY = h * 0.5;

      for (var x = 0; x <= w; x += 2) {
        var normalX = x / w;
        // Taper edges
        var envelope = Math.sin(normalX * Math.PI);
        var y = centerY +
          Math.sin(normalX * frequency + time * speed + offset) * amplitude * envelope +
          Math.sin(normalX * frequency * 0.5 + time * speed * 1.3 + offset * 2) * amplitude * 0.3 * envelope;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = 'rgba(' + ACCENT.r + ',' + ACCENT.g + ',' + ACCENT.b + ',' + alpha + ')';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function tick() {
      if (!isVisible) {
        raf = requestAnimationFrame(tick);
        return;
      }

      var rect = canvas.getBoundingClientRect();
      var w = rect.width;
      var h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Draw multiple layered waves
      for (var i = 0; i < WAVE_COUNT; i++) {
        var offset = i * 1.5;
        var amplitude = (h * 0.15) * (1 - i * 0.15);
        var frequency = 6 + i * 1.5;
        var alpha = 0.4 - i * 0.08;
        var speed = BASE_SPEED * (1 + i * 0.2);

        drawWave(w, h, offset, amplitude, frequency, alpha, speed);
      }

      // Center accent wave (brighter)
      drawWave(w, h, 0, h * 0.08, 8, 0.6, BASE_SPEED * 0.8);

      time += 1;
      raf = requestAnimationFrame(tick);
    }

    // Pause when tab hidden
    document.addEventListener('visibilitychange', function () {
      isVisible = !document.hidden;
    });

    // Resize handling
    var resizeTimeout;
    var ro = new ResizeObserver(function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });
    ro.observe(canvas);

    resize();
    tick();

    return function cleanup() {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }

  // Init all voice wave canvases
  function init() {
    document.querySelectorAll('.yf-hero-wave-canvas').forEach(initVoiceWave);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
