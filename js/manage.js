document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  const tbody = document.getElementById('transactions-body');
  const modal = document.getElementById('editModal');
  const closeBtn = document.querySelector('.close');
  const editForm = document.getElementById('editForm');

  // Fetch Transactions
  function loadTransactions() {
    fetch('http://localhost:5000/api/transactions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 401) {
        window.location.href = '/login';
        throw new Error('Unauthorized');
      }
      return res.json();
    })
    .then(data => {
      renderTransactions(data.transactions);
    })
    .catch(err => console.error(err));
  }

  function renderTransactions(transactions) {
    tbody.innerHTML = '';
    transactions.forEach(tx => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${new Date(tx.date).toLocaleDateString()}</td>
        <td>${tx.type.toUpperCase()}</td>
        <td>${tx.asset}</td>
        <td>${tx.quantity}</td>
        <td>$${tx.price.toFixed(2)}</td>
        <td>$${tx.total.toFixed(2)}</td>
        <td>
          <button class="btn-action btn-edit" data-id="${tx._id}" data-qty="${tx.quantity}" data-price="${tx.price}">Edit</button>
          <button class="btn-action btn-delete" data-id="${tx._id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Attach event listeners
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', openEditModal);
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', deleteTransaction);
    });
  }

  // Delete Transaction
  function deleteTransaction(e) {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    const id = e.target.dataset.id;

    fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadTransactions();
    })
    .catch(err => console.error(err));
  }

  // Edit Modal Logic
  function openEditModal(e) {
    const btn = e.target;
    document.getElementById('editId').value = btn.dataset.id;
    document.getElementById('editQuantity').value = btn.dataset.qty;
    document.getElementById('editPrice').value = btn.dataset.price;
    modal.style.display = 'block';
  }

  closeBtn.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const quantity = parseFloat(document.getElementById('editQuantity').value);
    const price = parseFloat(document.getElementById('editPrice').value);
    const total = quantity * price;

    fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity, price, total })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      modal.style.display = 'none';
      loadTransactions();
    })
    .catch(err => console.error(err));
  });

  loadTransactions();
});
