/* ============================================
   IT Staffing Agency — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ----- Mobile Navigation ----- */
  const navToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  function openMenu() {
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    // Trigger reflow for transition
    void mobileMenu.offsetHeight;
    mobileMenu.style.transform = 'translateY(0)';
    mobileMenu.style.opacity = '1';
  }

  function closeMenu() {
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.style.transform = 'translateY(-8px)';
    mobileMenu.style.opacity = '0';
    setTimeout(function () {
      mobileMenu.classList.remove('is-open');
    }, 300);
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.classList.contains('is-active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on mobile link click
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ----- Smooth Scroll with Header Offset ----- */
  var navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
    10
  ) || 72;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ----- Scroll Reveal (Intersection Observer) ----- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ----- Nav Background Solidify on Scroll ----- */
  var nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 80) {
          nav.style.backgroundColor = 'rgba(15, 23, 42, 0.97)';
        } else {
          nav.style.backgroundColor = 'rgba(15, 23, 42, 0.85)';
        }
      },
      { passive: true }
    );
  }
})();
