document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.feature-card');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'transform 600ms ease, opacity 600ms ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(function (card, idx) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transitionDelay = (idx * 80) + 'ms';
    observer.observe(card);
  });
});

