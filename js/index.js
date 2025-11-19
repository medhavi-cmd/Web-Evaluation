document.addEventListener('DOMContentLoaded', function () {
  // Simple reveal for hero and stats on scroll
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'transform 600ms ease, opacity 600ms ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  var hero = document.querySelector('.hero-text');
  if (hero) {
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(16px)';
    observer.observe(hero);
  }

  document.querySelectorAll('.stat-card').forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });

  // Button ripple on click for primary hero buttons
  document.querySelectorAll('.sign-in-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      ripple.style.background = 'rgba(0,0,0,0.15)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.transition = 'transform 500ms ease, opacity 600ms ease';
      ripple.style.pointerEvents = 'none';
      ripple.className = 'btn-ripple';
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      requestAnimationFrame(function () {
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        ripple.style.opacity = '0';
      });
      setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  });
});

