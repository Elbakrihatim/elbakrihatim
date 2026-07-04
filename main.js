(function () {
  'use strict';

  // ===== TYPING EFFECT =====
  const phrases = [
    'Data Science meets production.',
    'Deep Learning + MLOps.',
    'From notebooks to production.',
    'AI-powered solutions.',
  ];
  const typedEl = document.getElementById('typed-text');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx >= current.length) {
        deleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
      setTimeout(typeLoop, 70 + Math.random() * 40);
    } else {
      typedEl.textContent = current.slice(0, charIdx);
      charIdx--;
      if (charIdx < 0) {
        deleting = false;
        charIdx = 0;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 35);
    }
  }
  if (typedEl) setTimeout(typeLoop, 800);

  // ===== CURSOR GLOW =====
  const glow = document.getElementById('cursor-glow');
  if (glow && window.innerWidth > 768) {
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    function animateGlow() {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ===== FLOATING PARTICLES =====
  const particleContainer = document.getElementById('particles');
  if (particleContainer && window.innerWidth > 768) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 14) + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
      const colors = ['#34d399', '#a78bfa', '#60a5fa', '#fb923c'];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      particleContainer.appendChild(p);
    }
  }

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
  const revealEls = document.querySelectorAll(revealSelectors);

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ===== MOBILE NAV TOGGLE =====
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ===== SKILL PILL WOBBLE ON HOVER =====
  document.querySelectorAll('.skill-pill').forEach((pill) => {
    pill.addEventListener('mouseenter', () => {
      pill.style.animation = 'none';
      pill.offsetHeight; // reflow
      pill.style.animation = 'wiggle 0.4s ease';
    });
    pill.addEventListener('animationend', () => {
      pill.style.animation = '';
    });
  });

  // Add wiggle keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wiggle {
      0% { transform: translateY(-2px) rotate(0deg); }
      25% { transform: translateY(-2px) rotate(3deg); }
      50% { transform: translateY(-2px) rotate(-3deg); }
      75% { transform: translateY(-2px) rotate(2deg); }
      100% { transform: translateY(-2px) rotate(0deg); }
    }
  `;
  document.head.appendChild(style);

  // ===== PATH MARKER PULSE ON SCROLL =====
  const markers = document.querySelectorAll('.path-marker');
  if ('IntersectionObserver' in window) {
    const markerObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.animation = 'marker-pop 0.6s cubic-bezier(0.16,1,0.3,1) both';
            markerObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    markers.forEach((m) => markerObs.observe(m));

    const markerStyle = document.createElement('style');
    markerStyle.textContent = `
      @keyframes marker-pop {
        0% { opacity: 0; transform: translateX(-50%) scale(0) rotate(-180deg); }
        60% { transform: translateX(-50%) scale(1.15) rotate(10deg); }
        100% { opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
      }
    `;
    document.head.appendChild(markerStyle);
  }

  // ===== HERO EMOJI HOVER =====
  const heroEmoji = document.getElementById('hero-emoji');
  if (heroEmoji) {
    const emojis = ['🧠', '🤖', '📊', '🔬', '⚡', '🚀', '💡', '🎯'];
    let emojiIdx = 0;
    heroEmoji.addEventListener('click', () => {
      emojiIdx = (emojiIdx + 1) % emojis.length;
      heroEmoji.style.animation = 'none';
      heroEmoji.offsetHeight;
      heroEmoji.textContent = emojis[emojiIdx];
      heroEmoji.style.animation = 'bounce-in 0.5s cubic-bezier(0.16,1,0.3,1) both';
    });
    heroEmoji.style.cursor = 'pointer';
    heroEmoji.title = 'Click me!';
  }

  // ===== CONTACT FORM =====
  window.handleSubmit = function (e) {
    e.preventDefault();
    const btn = document.getElementById('form-submit');
    btn.textContent = '✅ Sent!';
    btn.style.background = '#059669';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '🚀 Send message';
      btn.style.background = '';
      btn.disabled = false;
      document.getElementById('contact-form').reset();
    }, 2500);
    return false;
  };

  // ===== NAV SCROLL EFFECT =====
  const nav = document.getElementById('nav');
  let ticking = false;
  const updateNav = () => {
    nav.style.background = window.scrollY > 80
      ? 'rgba(6,11,24,0.92)'
      : 'rgba(6,11,24,0.7)';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
  }, { passive: true });

})();
