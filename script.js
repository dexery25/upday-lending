const modal = document.querySelector('#trial-modal');
const form = document.querySelector('#trial-form');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modal.querySelector('input')?.focus(), 120);
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', openModal));
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.classList.add('is-sent');
  form.querySelector('button').textContent = 'Заявка отправлена ✓';
  form.querySelector('button').disabled = true;
  document.querySelector('.form-success').classList.add('is-visible');
});

menuToggle.addEventListener('click', () => {
  const opened = menuToggle.classList.toggle('is-open');
  nav.classList.toggle('is-open', opened);
  menuToggle.setAttribute('aria-expanded', String(opened));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.classList.remove('is-open');
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
