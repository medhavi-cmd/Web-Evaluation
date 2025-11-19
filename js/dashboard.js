document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  fetch(`http://localhost:5000/api/dashboard`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(function (response) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }
      if (!response.ok) throw new Error('Failed to load financial data');
      return response.json();
    })
    .then(function (data) {
      var incomeElement = document.getElementById('income');
      var expensesElement = document.getElementById('expenses');
      // Assuming you might want to show balance too, but sticking to existing UI elements for now
      if(incomeElement) incomeElement.textContent = '$' + Number(data.income).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if(expensesElement) expensesElement.textContent = '$' + Number(data.expenses).toLocaleString('en-US', { minimumFractionDigits: 2 });
    })
    .catch(function (error) { console.error('Error fetching financial data:', error); });

  var cryptoPriceElement = document.getElementById('crypto-price');
  var inputCrypto = document.getElementById('input-crypto');
  var inputUSD = document.getElementById('input-usd');
  if (cryptoPriceElement && inputCrypto && inputUSD) {
    var priceText = cryptoPriceElement.textContent.trim();
    var priceValue = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    function convertCryptoToUSD() {
      var cryptoAmount = parseFloat(inputCrypto.value) || 0;
      var converted = cryptoAmount * priceValue;
      inputUSD.value = converted.toFixed(2);
    }
    inputCrypto.addEventListener('input', convertCryptoToUSD);

    // Live price micro-updates (mock): +/- up to 0.5% every 5s
    setInterval(function () {
      var deltaPct = (Math.random() - 0.5) * 0.01;
      priceValue = Math.max(0, priceValue * (1 + deltaPct));
      cryptoPriceElement.textContent = '$' + priceValue.toFixed(2) + ' USD';
      convertCryptoToUSD();
    }, 5000);

    // BUY button handler
    var buyBtn = document.querySelector('.buy-button');
    if (buyBtn) {
      buyBtn.addEventListener('click', function () {
        var qty = parseFloat(inputCrypto.value) || 0;
        var usd = parseFloat(inputUSD.value) || 0;
        alert('Order placed: Buy ' + qty + ' NTC for $' + usd.toFixed(2));
      });
    }
  }
});

