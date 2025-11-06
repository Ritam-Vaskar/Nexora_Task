const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/adminController');
const { auth, adminAuth } = require('../middleware/auth');

router.use(auth);
router.use(adminAuth);

router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;
