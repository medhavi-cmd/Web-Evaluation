const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { authMiddleware } = require('./middleware');

router.post('/signup', controller.signup);
router.post('/login', controller.login);

// Protected Routes
router.get('/dashboard', authMiddleware, controller.getDashboard);
router.post('/buy', authMiddleware, controller.buy);
router.post('/sell', authMiddleware, controller.sell);
router.get('/transactions', authMiddleware, controller.getTransactions);
router.put('/transactions/:id', authMiddleware, controller.updateTransaction);
router.delete('/transactions/:id', authMiddleware, controller.deleteTransaction);

router.get('/faqs', controller.getFAQs);

module.exports = router;
