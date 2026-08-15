const modal = document.querySelector('#trial-modal');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.setTimeout(() => modal.querySelector('input')?.focus(), 120);
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', openModal));
document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = form.querySelector('.form-success');
    submitButton.textContent = 'Заявка отправлена ✓';
    submitButton.disabled = true;
    successMessage.classList.add('is-visible');
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  nav.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.classList.remove('is-open');
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.age-card').forEach((card) => {
  card.addEventListener('toggle', () => {
    if (!card.open) return;
    document.querySelectorAll('.age-card').forEach((otherCard) => {
      if (otherCard !== card) otherCard.open = false;
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
