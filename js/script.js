/* ════════════════════════════════════════
   InAmigos Foundation – script.js
   ════════════════════════════════════════ */

/* ── Smooth nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--green)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

/* ── Nav shrink on scroll ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.padding    = '12px 40px';
    nav.style.boxShadow  = '0 2px 20px rgba(15,31,22,.08)';
  } else {
    nav.style.padding    = '';
    nav.style.boxShadow  = '';
  }
});

/* ── Animate numbers (count-up) ── */
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = (target % 1 === 0 ? Math.floor(current).toLocaleString() : current.toFixed(1)) + suffix;
  }, step);
}

/* Wire up count-up to impact numbers */
const impactNums = document.querySelectorAll('.impact-num');
const countTargets = [50000, 30000, 28, 200];
const countSuffixes = ['+', '+', '', '+'];

impactNums.forEach((el, i) => {
  el.dataset.target = countTargets[i];
  el.dataset.suffix = countSuffixes[i];
  el.textContent = '0';
});

const impactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.textContent === '0') {
      animateCount(entry.target);
    }
  });
}, { threshold: 0.5 });

impactNums.forEach(el => impactObserver.observe(el));

/* ── Scroll-reveal for cards ── */
const revealEls = document.querySelectorAll(
  '.project-card, .impact-card, .gallery-item, .about-item'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .5s ${i * 0.06}s ease, transform .5s ${i * 0.06}s ease`;
  revealObserver.observe(el);
});

/* ── Mobile nav toggle (hamburger) ── */
// Inject hamburger button
const hamburger = document.createElement('button');
hamburger.innerHTML = '☰';
hamburger.setAttribute('aria-label', 'Toggle menu');
hamburger.style.cssText = `
  display:none; background:none; border:none; font-size:1.5rem;
  color:var(--green); cursor:pointer; padding:4px;
`;
nav.insertBefore(hamburger, nav.querySelector('.nav-cta'));

// Mobile menu drawer
const mobileMenu = document.createElement('div');
mobileMenu.innerHTML = `
  <a href="#about">About</a>
  <a href="#projects">Projects</a>
  <a href="#impact">Impact</a>
  <a href="#gallery">Gallery</a>
  <a href="#contact">Contact</a>
`;
mobileMenu.style.cssText = `
  display:none; flex-direction:column; gap:0;
  position:fixed; top:65px; left:0; right:0; z-index:99;
  background:rgba(253,248,240,.97); backdrop-filter:blur(10px);
  border-bottom:1px solid rgba(26,102,65,.1);
  padding:10px 0;
`;
[...mobileMenu.querySelectorAll('a')].forEach(a => {
  a.style.cssText = 'padding:14px 28px; font-size:1rem; font-weight:500; color:var(--mid); border-bottom:1px solid rgba(0,0,0,.04);';
  a.addEventListener('click', () => { mobileMenu.style.display = 'none'; hamburger.innerHTML = '☰'; });
});
document.body.appendChild(mobileMenu);

function checkHamburger() {
  if (window.innerWidth <= 900) {
    hamburger.style.display = 'block';
  } else {
    hamburger.style.display = 'none';
    mobileMenu.style.display = 'none';
  }
}
checkHamburger();
window.addEventListener('resize', checkHamburger);

hamburger.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = open ? 'none' : 'flex';
  hamburger.innerHTML = open ? '☰' : '✕';
});
