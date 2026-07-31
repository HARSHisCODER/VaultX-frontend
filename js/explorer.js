const explorerRoot = document.querySelector('.content-stack');

if (explorerRoot) {
  const segmented = Array.from(document.querySelectorAll('.segmented button'));
  segmented.forEach((button) => {
    button.addEventListener('click', () => {
      segmented.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });

  const createButton = document.querySelector('.primary-btn');
  if (createButton) {
    createButton.addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'New folder created in your vault';
      document.body.appendChild(toast);
      window.setTimeout(() => toast.remove(), 1800);
    });
  }

  document.querySelectorAll('.folder-card, .file-row, .row-item, .timeline-item').forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('is-selected');
    });
  });
}
