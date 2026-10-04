/* Fazla Al Kahfi — Portfolio
   1. Footer year
   2. Navbar scroll effect
   3. Mobile navbar
   4. Smooth scrolling
   5. Reveal on scroll
   6. Active navigation
   7. Contact card spotlight
*/

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 2. NAVBAR SCROLL EFFECT ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav-link[href^="#"]')
  );

  var lastY = -1;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (y === lastY) return;
    lastY = y;
    if (nav) nav.classList.toggle('is-scrolled', y > 24);

    if (menu && menu.classList.contains('is-open')) {
      if (y > 80) closeMenu();
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });

  onScroll();

  /* ---------- 3. MOBILE NAVBAR ---------- */
  function openMenu() {
    if (!menu || !toggle) return;
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Tutup menu navigasi');
  }

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu navigasi');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- 4. SMOOTH SCROLLING ---------- */
  var supportsNative = 'scrollBehavior' in document.documentElement.style;

  document.addEventListener('click', function (e) {
    var anchor = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!anchor) return;

    var href = anchor.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;

    var target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    closeMenu();

    if (reduceMotion || !supportsNative) {
      var offset = target.getBoundingClientRect().top + window.scrollY -
        (parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h'), 10) || 72) - 20;
      window.scrollTo(0, Math.max(0, offset));
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (history.replaceState) history.replaceState(null, '', href);
  });

  /* ---------- 5. REVEAL ON SCROLL ---------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  revealables.forEach(function (el) {
    var delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--d', delay);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 6. ACTIVE NAVIGATION ---------- */
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var visible = Object.create(null);

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      var bestId = null;
      var bestRatio = 0;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > bestRatio) {
          bestRatio = visible[id];
          bestId = id;
        }
      });

      if (bestId && bestRatio > 0.02) setActive(bestId);
    }, {
      threshold: [0.05, 0.15, 0.3, 0.5, 0.75, 1],
      rootMargin: '-25% 0px -55% 0px'
    });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------- 7. CONTACT CARD SPOTLIGHT ---------- */
  var cards = document.querySelectorAll('.contact-card');

  if (!reduceMotion && cards.length && window.matchMedia('(hover: hover)').matches) {
    cards.forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }
})();