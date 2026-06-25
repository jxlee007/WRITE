// Enhanced main.js with improved performance and accessibility
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

  // Performance optimizations
  const gsapAny = window.gsap;
  const ScrollTriggerAny = window.ScrollTrigger;

  if (gsapAny && ScrollTriggerAny) {
    if (typeof gsapAny.registerPlugin === 'function') {
      gsapAny.registerPlugin(ScrollTriggerAny);
    }

    // Enhanced scroll effects with GSAP
    if (!prefersReduced) {
      // Parallax background animation
      const parallaxImg = document.querySelector('.parallax-zoom');
      if (parallaxImg) {
        gsapAny.to(parallaxImg, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxImg,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

      }

      // Batch / section-scoped fade: fade all .scroll-reveal items inside
      // the centered section when the section top moves from ~30% -> 20% of viewport.
      // Uses a scrubbed timeline so the fade is reversible when scrolling back.
      (function () {
        const fadeSection = document.querySelector('div.max-w-6xl.mx-auto.px-6.py-20');
        if (!fadeSection) return;

        const items = fadeSection.querySelectorAll('.scroll-reveal');
        if (!items || items.length === 0) return;

        // set willChange for performance
        items.forEach(it => {
          if (it instanceof HTMLElement) {
            it.style.willChange = 'opacity, transform';
          }
        });

        // Ensure initial state
        gsapAny.set(items, { opacity: 1, y: 0 });

        // Create a scrubbed timeline that maps scroll progress to opacity/translate
        gsapAny.timeline({
          scrollTrigger: {
            trigger: fadeSection,
            start: 'top 30%',
            end: 'top 20%',
            scrub: 0.6,
            invalidateOnRefresh: true,
            markers: Boolean(isDev)
          }
        })
          .to(items, {
            opacity: 0,
            y: -12,
            ease: 'none',
            stagger: 0.03
          });

        // On refresh we keep will-change and let the timeline handle reappearance.
        ScrollTriggerAny.addEventListener && ScrollTriggerAny.addEventListener('refresh', () => {
          // placeholder for future adjustments
        });
      })();

      // Header fade animation
      const header = document.getElementById('main-header');
      if (header) {
        gsapAny.to(header, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "30% top",
            scrub: 1
          }
        });
      }

      // Film cards entrance animation
      const filmCards = document.querySelectorAll('.film-card');
      if (filmCards.length > 0) {
        gsapAny.from(filmCards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filmCards[0],
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Case cards entrance animation (for dossier page)
      const caseCards = document.querySelectorAll('.case-card');
      if (caseCards.length > 0) {
        gsapAny.from(caseCards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: caseCards[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Reveal details and fade scroll hint based on scroll progress
      ScrollTriggerAny.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: function (self) {
          const p = self.progress;

          // Fade scroll indicator
          const scrollHint = document.querySelector('.scroll-indicator');
          if (scrollHint instanceof HTMLElement) {
            gsapAny.to(scrollHint, {
              opacity: Math.max(0, 1 - p * 2),
              duration: 0.2
            });
          }

          // Fade protagonist subtitle
          const protag = document.querySelector('.protag-subtitle');
          if (protag instanceof HTMLElement && !prefersReduced) {
            gsapAny.to(protag, {
              opacity: Math.max(0, 1 - p * 3),
              y: -30 * p,
              duration: 0.15,
              overwrite: true
            });
          } else if (protag instanceof HTMLElement) {
            protag.style.opacity = p > 0.9 ? '0' : '1';
          }

          // Show reveal details when scrolling down (earlier trigger point)
          const revealDetails = document.getElementById('reveal-details');
          if (revealDetails instanceof HTMLElement) {
            if (p > 0.7) {  // Show earlier when 70% scrolled
              gsapAny.to(revealDetails, {
                opacity: 1,
                y: -10,
                duration: 0.6,
                ease: "power2.out"
              });
            } else {
              gsapAny.to(revealDetails, {
                opacity: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        }
      });

      // Enhanced zoom effect when reaching end
      const hero = document.querySelector('.hero-section');
      const img = document.getElementById('parallax-img');
      let scrollEndTimeout = null;
      let ticking = false;

      function handleScroll() {
        if (scrollEndTimeout !== null) {
          window.clearTimeout(scrollEndTimeout);
          scrollEndTimeout = null;
        }
        const rect = hero && typeof hero.getBoundingClientRect === 'function' ? hero.getBoundingClientRect() : null;
        const reached = rect && rect.bottom <= window.innerHeight + 1;

        if (reached) {
          scrollEndTimeout = window.setTimeout(() => {
            if (img) {
              gsapAny.to('#parallax-img', {
                scale: 4.5,
                duration: 0.6,
                ease: 'power3.out'
              });
            }
          }, 120);
        } else if (img) {
          gsapAny.to('#parallax-img', {
            scale: 1,
            duration: 0.45,
            ease: 'power2.out'
          });
        }
      }

      // Throttle scroll handling with requestAnimationFrame (best practice)
      function onScroll() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      window.addEventListener('touchend', () => setTimeout(onScroll, 80), { passive: true });
      window.addEventListener('wheel', () => {
        if (scrollEndTimeout !== null) {
          window.clearTimeout(scrollEndTimeout);
          scrollEndTimeout = null;
        }
      }, { passive: true });

      onScroll();
    }

    // Performance optimization for animated elements
    document.querySelectorAll('.animated-element').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.willChange = 'transform,opacity';
        el.style.transform = 'translateZ(0)'; // Force GPU layer
      }
    });

    // SWUP navigation for timeline -> dossier (leftward transition)
    // Attach to timeline-toggle if present on the page
    const timelineToggle = document.querySelector('.timeline-toggle');
    if (timelineToggle) {
      timelineToggle.addEventListener('click', (e) => {
        e.preventDefault();

        // Preferred: use swup if available on the page
        const base = window.BASE_URL || '/';
        const targetUrl = `${base}dossier`;

        // If a global swup instance exists (created on the page or another), use it
        const doSwupNavigate = () => {
          try {
            if (window.__swup && typeof window.__swup.visit === 'function') {
              // add a transition attribute to hint plugin to slide left
              document.documentElement.setAttribute('data-swup-transition', 'slide-left');
              window.__swup.visit(targetUrl);
              return true;
            }
            // try Swup global (if loaded via CDN on this page)
            if (window.Swup && typeof window.Swup === 'function') {
              // create a temporary swup instance to perform navigation
              const temp = new window.Swup();
              temp.visit(targetUrl);
              return true;
            }
          } catch (err) {
            console.warn('swup navigation failed', err);
          }
          return false;
        };

        const navigated = doSwupNavigate();
        if (!navigated) {
          // fallback: use a smooth CSS-driven page slide simulated via body animation then location change
          const overlay = document.createElement('div');
          overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0a0a;z-index:9999;transform:translateX(0);';
          document.body.appendChild(overlay);
          overlay.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-100%)' }
          ], { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)' });
          setTimeout(() => { window.location.href = targetUrl; }, 420);
        }
      });
    }
  }

  // Enhanced page transitions
  function initPageTransitions() {
    const transitionLinks = document.querySelectorAll('a[data-swup-transition]');

    transitionLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();

          // Create transition overlay
          const overlay = document.createElement('div');
          overlay.className = 'page-transition-overlay';
          overlay.style.cssText = `
              position: fixed;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100vh;
              background: linear-gradient(135deg, rgba(10,10,10,0.95), rgba(0,0,0,0.98));
              z-index: 9999;
              transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1);
              backdrop-filter: blur(10px);
            `;

          document.body.appendChild(overlay);

          // Animate overlay
          requestAnimationFrame(() => {
            overlay.style.left = '0%';
          });

          // Navigate after animation
          setTimeout(() => {
            window.location.href = href;
          }, 300);
        }
      });
    });
  }

  // Accessibility enhancements
  function initA11y() {
    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // Keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('[role="dialog"], .modal, .characters-modal');
        modals.forEach(modal => {
          if (modal.style.display !== 'none') {
            const closeBtn = modal.querySelector('[aria-label*="close"], .close-btn');
            if (closeBtn) closeBtn.click();
          }
        });
      }
    });

    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: black;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
      `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Performance monitoring (dev only)
  if (isDev) {
    let frameCount = 0;
    let lastTime = performance.now();

    function monitorFPS() {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        console.log(`🎬 FPS: ${frameCount}`);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(monitorFPS);
    }

    requestAnimationFrame(monitorFPS);
  }

  // Initialize all features
  initPageTransitions();
  initA11y();

  // Add main content ID for skip link
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main-content';
  }

  console.log('🚀 Shadow Protocol - Enhanced UX initialized');
});
