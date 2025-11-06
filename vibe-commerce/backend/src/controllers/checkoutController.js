const Order = require('../models/Order');
const CartItem = require('../models/CartItem');

// @desc    Create order from cart
// @route   POST /api/checkout
const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;

    // Get cart items
    const cartItems = await CartItem.find({ userId: req.user.id }).populate('productId');

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total and prepare order items
    let total = 0;
    const orderItems = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        image: item.productId.image,
      };
    });

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      customerName,
      customerEmail,
      items: orderItems,
      total,
    });

    // Clear cart after successful order
    await CartItem.deleteMany({ userId: req.user.id });

    res.status(201).json({
      orderId: order._id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items,
      total: order.total,
      timestamp: order.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's orders
// @route   GET /api/checkout/orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.productId')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
};
