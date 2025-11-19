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
    var terms = document.getElementById('terms');
    var email = document.getElementById('email');
    var name = document.getElementById('name');
    var emailValid = email ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email.value || '').trim()) : true;
    if (email && !emailValid) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      return;
    }
    if (name && name.value.trim().length < 2) {
      e.preventDefault();
      alert('Please enter your full name.');
      return;
    }
    if (terms && !terms.checked) {
      e.preventDefault();
      alert('Please agree to the terms & policies.');
      return;
    }

    e.preventDefault(); // Prevent default form submission

    const userData = {
      name: name.value,
      email: email.value,
      password: document.getElementById('password').value
    };

    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        alert('Signup successful! Please login.');
        window.location.href = '/login';
      } else {
        return response.json().then(data => {
          alert(data.message || 'Signup failed');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during signup');
    });
  });
});

