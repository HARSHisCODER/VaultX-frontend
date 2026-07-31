const shell = document.querySelector('.dashboard-shell');
const sidebar = document.querySelector('.sidebar');
const cards = Array.from(document.querySelectorAll('.card'));
const searchBar = document.querySelector('.search-bar');
const bell = document.querySelector('.icon-btn.bell');
const storageChart = document.querySelector('.storage-chart');
const percentageValue = document.querySelector('[data-percentage]');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const viewPanels = Array.from(document.querySelectorAll('.view-panel'));

const setView = (viewName) => {
  viewPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `view-${viewName}`);
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.view === viewName;
    item.classList.toggle('active', isActive);
    if (isActive) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });

  if (viewName !== 'dashboard') {
    window.history.replaceState(null, '', `#${viewName}`);
  } else {
    window.history.replaceState(null, '', '#dashboard');
  }
};

const setParallax = (x, y) => {
  const normalizedX = x * 8;
  const normalizedY = y * 8;

  sidebar.style.transform = `perspective(1400px) rotateX(${-normalizedY * 0.2}deg) rotateY(${normalizedX * 0.2}deg) translateZ(0)`;

  cards.forEach((card, index) => {
    const strength = card.classList.contains('storage-card') ? 1.2 : 0.8;
    const offsetX = normalizedX * strength * (index % 2 === 0 ? 1 : -0.7);
    const offsetY = normalizedY * strength * (index % 2 === 0 ? -0.9 : 1);
    card.style.setProperty('--parallax-x', `${offsetX}px`);
    card.style.setProperty('--parallax-y', `${offsetY}px`);
  });
};

const resetParallax = () => {
  sidebar.style.transform = '';
  cards.forEach((card) => {
    card.style.setProperty('--parallax-x', '0px');
    card.style.setProperty('--parallax-y', '0px');
  });
};

const animateStorage = () => {
  const target = 78;
  let current = 0;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / 1100);
    current = Math.round(progress * target);
    storageChart.style.setProperty('--progress', `${current}%`);
    percentageValue.textContent = `${current}%`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

window.addEventListener('load', () => {
  shell.classList.add('ready');
  animateStorage();
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  setView(hash);
});

document.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;
  setParallax(x, y);
});

document.addEventListener('mouseleave', resetParallax);

searchBar.addEventListener('focusin', () => searchBar.classList.add('focused'));
searchBar.addEventListener('focusout', () => searchBar.classList.remove('focused'));

bell.addEventListener('click', () => {
  bell.style.animation = 'bell-shake 0.7s ease-in-out 1';
  setTimeout(() => {
    bell.style.animation = '';
  }, 700);
});

navItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const page = item.dataset.page;
    if (page && page !== 'dashboard.html') {
      return;
    }

    event.preventDefault();
    const viewName = item.dataset.view;
    setView(viewName);
  });
});
