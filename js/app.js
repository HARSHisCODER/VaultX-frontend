document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('app-ready');

  const addRipple = (event, button) => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  };

  document.querySelectorAll('button, .primary-btn, .ghost-btn, .icon-btn, .upload-btn, .action-btn, .nav-item').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (element.classList.contains('ripple-disabled')) return;
      if (event.detail > 0) addRipple(event, element);
    });
  });

  document.querySelectorAll('.nav-item').forEach((item) => {
    const href = item.getAttribute('href') || '';
    if (!href) return;
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (href.endsWith(path) || (path === 'dashboard.html' && href.includes('dashboard'))) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
  });

  const shell = document.querySelector('.layout-shell') || document.querySelector('.dashboard-shell') || document.body;
  if (shell && window.matchMedia('(hover: hover)').matches) {
    shell.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty('--pointer-x', `${x.toFixed(2)}`);
      document.documentElement.style.setProperty('--pointer-y', `${y.toFixed(2)}`);
    });

    shell.addEventListener('pointerleave', () => {
      document.documentElement.style.setProperty('--pointer-x', '0');
      document.documentElement.style.setProperty('--pointer-y', '0');
    });
  }
});
