document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.auth-form form');
  if (!form) return;
  // Show/Hide password toggle
  var password = document.getElementById('password');
  if (password) {
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.textContent = 'Show';
    toggle.style.marginLeft = '8px';
    toggle.addEventListener('click', function () {
      var isText = password.type === 'text';
      password.type = isText ? 'password' : 'text';
      toggle.textContent = isText ? 'Show' : 'Hide';
    });
    password.parentElement.appendChild(toggle);
  }
  form.addEventListener('submit', function (e) {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    if (!email || !password) return;
    var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value || '').trim());
    if (!emailValid) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      return;
    }
    if (!email.value || !password.value) {
      e.preventDefault();
      alert('Please enter both email and password.');
      return;
    }

    e.preventDefault(); // Prevent default form submission

    const loginData = {
      email: email.value,
      password: password.value
    };

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token); // Store JWT
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        window.location.href = '/dashboard';
      } else {
        alert(data.message || 'Login failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during login');
    });
  });
});

