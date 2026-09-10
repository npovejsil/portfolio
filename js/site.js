/* Portfolio site behaviour. No framework, no build step — plain ES5.
   Loaded with `defer` on every page; each feature no-ops where it doesn't apply. */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     1. Scrollspy — highlight the index row for the project in view.
        Work/landing page only.
     --------------------------------------------------------------- */
  function scrollspy() {
    var entries = [].slice.call(document.querySelectorAll('.work-entry'));
    if (!entries.length) return;

    var rows = {};
    [].forEach.call(document.querySelectorAll('.work-index-table a[href^="#"]'), function (a) {
      var tr = a.closest('tr');
      if (tr) rows[a.getAttribute('href').slice(1)] = tr;
    });

    var active = null, ticking = false;

    function update() {
      ticking = false;
      /* Active = last entry whose top has crossed a line near the viewport top.
         Keep it shallow so short cards aren't skipped. */
      var line = Math.max(80, window.innerHeight * 0.15);
      var current = entries[0];
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].getBoundingClientRect().top <= line) current = entries[i];
      }
      /* At the bottom of the page the final entries can never cross the line. */
      var doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = entries[entries.length - 1];
      }
      if (current.id === active) return;
      active = current.id;
      for (var id in rows) rows[id].classList.toggle('is-active', id === active);
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
  }

  /* ---------------------------------------------------------------
     2. Link preview — show the destination in the corner on hover,
        the way a browser status bar does. All pages.
     --------------------------------------------------------------- */
  function linkPreview() {
    var box = document.createElement('div');
    box.className = 'link-preview';
    box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);

    function label(a) {
      var raw = a.getAttribute('href') || '';
      if (!raw) return '';

      /* In-page anchor: name the destination, not the id */
      if (raw.charAt(0) === '#') {
        var text = (a.textContent || '').trim();
        return text ? '↓ ' + text : raw;
      }
      if (raw.indexOf('mailto:') === 0) return raw.slice(7);

      var u;
      try { u = new URL(a.href); } catch (e) { return raw; }

      /* Same-site: show the path only */
      if (u.origin === location.origin) {
        return (u.pathname.replace(/^\//, '') || 'index.html') + (u.hash || '');
      }

      var s = u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/$/, '');
      return s.length > 52 ? s.slice(0, 51) + '…' : s;
    }

    function show(a) {
      var text = label(a);
      if (!text) return;
      box.textContent = text;
      box.classList.add('is-visible');
    }
    function hide() { box.classList.remove('is-visible'); }

    function closestLink(el) {
      return el && el.closest ? el.closest('a[href]') : null;
    }

    document.addEventListener('mouseover', function (e) {
      var a = closestLink(e.target);
      if (a) show(a);
    });
    document.addEventListener('mouseout', function (e) {
      if (closestLink(e.target) && !closestLink(e.relatedTarget)) hide();
    });
    /* Keyboard parity */
    document.addEventListener('focusin', function (e) {
      var a = closestLink(e.target);
      if (a) show(a);
    });
    document.addEventListener('focusout', hide);
    addEventListener('blur', hide);
  }

  /* ---------------------------------------------------------------
     3. "More Info…" menu — the top-bar links as a popover.
        About page only. Without JS the button stays a plain link home.
     --------------------------------------------------------------- */
  function moreInfoMenu() {
    var button = document.querySelector('.about-button');
    var menu = document.querySelector('.about-menu');
    if (!button || !menu) return;

    function open() {
      menu.hidden = false;
      /* next frame so the transition runs */
      requestAnimationFrame(function () { menu.classList.add('is-open'); });
      button.setAttribute('aria-expanded', 'true');
    }
    function close() {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      setTimeout(function () {
        if (button.getAttribute('aria-expanded') === 'false') menu.hidden = true;
      }, 140);
    }
    function isOpen() { return button.getAttribute('aria-expanded') === 'true'; }

    button.addEventListener('click', function (e) {
      e.preventDefault();
      isOpen() ? close() : open();
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !e.target.closest('.about-actions')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { close(); button.focus(); }
    });
  }

  scrollspy();
  linkPreview();
  moreInfoMenu();
})();
