const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/checkoutController');
const { auth } = require('../middleware/auth');

router.use(auth);

router.post('/', createOrder);
router.get('/orders', getUserOrders);

module.exports = router;
