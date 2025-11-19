document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.toggle-buttons button');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // Dynamic totals (simple mock pricing)
  var priceByAsset = { BTC: 29000, ETH: 1800, USDC: 1 };
  var form = document.querySelector('.order-box form');
  if (!form) return;
  var selects = form.querySelectorAll('select');
  var inputs = form.querySelectorAll('input');
  var quantityInput = inputs[1] || form.querySelector('input[type="number"]');
  var assetSelect = selects[1];
  var amountInput = inputs[3];

  function recalc() {
    if (!quantityInput || !assetSelect || !amountInput) return;
    var qty = parseFloat(quantityInput.value) || 0;
    var asset = (assetSelect.value || 'BTC').toUpperCase();
    var price = priceByAsset[asset] != null ? priceByAsset[asset] : 0;
    var total = qty * price;
    amountInput.value = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (quantityInput) quantityInput.addEventListener('input', recalc);
  if (assetSelect) assetSelect.addEventListener('change', recalc);
  recalc();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      window.location.href = '/login';
      return;
    }

    const asset = (assetSelect.value || 'BTC').toUpperCase();
    const quantity = parseFloat(quantityInput.value) || 0;
    const price = priceByAsset[asset] || 0;

    fetch('http://localhost:5000/api/sell', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ asset, quantity, price })
    })
    .then(res => {
      if (res.status === 401) {
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }
      return res.json();
    })
    .then(data => {
      if (data.message === 'Sale successful') {
        alert('Sale successful!');
        window.location.href = '/dashboard';
      } else {
        alert(data.message || 'Sale failed');
      }
    })
    .catch(err => console.error(err));
  });
});

