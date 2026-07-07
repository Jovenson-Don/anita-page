// ============================
// MOBILE MENU
// ============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// ============================
// PORTFOLIO FILTER
// ============================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
        // Pause any video that gets filtered out
        const vid = card.querySelector('video');
        if (vid) vid.pause();
      }
    });
  });
});

// ============================
// CONTACT FORM
// ============================
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const idleLabel = 'Send My Message ✨';

  btn.disabled = true;
  btn.textContent = 'Sending…';
  btn.style.background = '';

  const reset = (label, bg, delay) => {
    btn.textContent = label;
    btn.style.background = bg;
    setTimeout(() => {
      btn.textContent = idleLabel;
      btn.style.background = '';
      btn.disabled = false;
    }, delay);
  };

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      form.reset();
      form.hidden = true;
      const thanks = document.getElementById('formThanks');
      if (thanks) thanks.hidden = false;
    } else {
      const data = await res.json().catch(() => null);
      const msg = data && data.errors
        ? data.errors.map(err => err.message).join(', ')
        : 'Submission failed';
      console.error('Formspree error:', msg);
      reset('Something went wrong — try again', '#a33', 4000);
      btn.disabled = false;
    }
  } catch (err) {
    console.error('Network error:', err);
    reset('Network error — try again', '#a33', 4000);
    btn.disabled = false;
  }
});

// ============================
// SCROLL ANIMATIONS
// ============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

const animateEls = document.querySelectorAll(
  '.service-card, .portfolio-card, .stat-card, .whyme-list li'
);

animateEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});

// ============================
// PORTFOLIO VIDEOS — one at a time
// ============================
const portfolioVideos = document.querySelectorAll('.port-media');
portfolioVideos.forEach(video => {
  video.addEventListener('play', () => {
    portfolioVideos.forEach(other => {
      if (other !== video) other.pause();
    });
  });
});

// ============================
// STICKY HEADER SHADOW
// ============================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});
