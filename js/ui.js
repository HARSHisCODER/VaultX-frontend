const revealTargets = Array.from(document.querySelectorAll('.reveal'));

if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

const hoverableCards = Array.from(document.querySelectorAll('.card, .hero-card, .folder-card, .file-row, .row-item, .timeline-item'));
hoverableCards.forEach((card) => {
  card.addEventListener('mouseenter', () => card.classList.add('is-hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('is-hovered'));
});
