// NexFlow AI — site script (menu, reveal on scroll, pricing toggle, contact form)
document.documentElement.classList.remove('no-js');

// ---------- Mobile menu ----------
const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.menu-btn');
if (nav && menuBtn) {
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('.nav-links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setOpen(false); });
}

// ---------- Footer year ----------
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// ---------- Reveal on scroll ----------
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// ---------- Pricing: monthly / yearly ----------
const toggle = document.querySelector('.billing-toggle');
if (toggle) {
  const buttons = toggle.querySelectorAll('button');
  buttons.forEach((btn) => btn.addEventListener('click', () => {
    const yearly = btn.dataset.plan === 'yearly';
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    document.querySelectorAll('[data-monthly]').forEach((el) => {
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
    });
    document.querySelectorAll('[data-period]').forEach((el) => {
      el.textContent = yearly ? '/mo, billed yearly' : '/month';
    });
  }));
}

// ---------- Contact form ----------
const form = document.querySelector('#contact-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    status.className = 'form-status';
    if (!d.name || !d.email || !d.message) {
      status.textContent = 'Please fill in your name, email and message.';
      status.classList.add('err');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('err');
      return;
    }
    form.reset();
    status.textContent = `Thanks, ${d.name.split(' ')[0]}! This is a concept site, so the form is a demo and no message was sent.`;
    status.classList.add('ok');
  });
}
