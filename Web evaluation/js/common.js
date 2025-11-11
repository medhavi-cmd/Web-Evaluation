document.addEventListener('DOMContentLoaded', function () {
  // Highlight active nav link based on current page
  var path = (location.pathname.split('/').pop() || '').toLowerCase();
  document.querySelectorAll('header.navbar nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href && path && href === path) {
      a.style.textDecoration = 'underline';
    }
  });

  // Footer email input: simple validation on Enter
  var emailInputs = document.querySelectorAll('.footer-right input[type="email"]');
  emailInputs.forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var value = (input.value || '').trim();
        var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        alert(isValid ? 'Thanks! We will keep you updated.' : 'Please enter a valid email address.');
      }
    });
  });
});

