const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user.id }).populate('productId');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        _id: item._id,
        product: item.productId,
        quantity: item.quantity,
        itemTotal,
      };
    });

    res.json({
      items,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, qty } = req.body;
    const itemQuantity = quantity || qty || 1;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({
      userId: req.user.id,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += itemQuantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        userId: req.user.id,
        productId,
        quantity: itemQuantity,
      });
    }

    // Return complete cart with all items
    const cartItems = await CartItem.find({ userId: req.user.id }).populate('productId');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        _id: item._id,
        product: item.productId,
        quantity: item.quantity,
        itemTotal,
      };
    });

    res.status(201).json({
      items,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
const updateCartItem = async (req, res) => {
  try {
    const { quantity, qty } = req.body;
    const itemQuantity = quantity || qty;
    
    const cartItem = await CartItem.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = itemQuantity;
    await cartItem.save();
    
    // Return complete cart with all items
    const cartItems = await CartItem.find({ userId: req.user.id }).populate('productId');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        _id: item._id,
        product: item.productId,
        quantity: item.quantity,
        itemTotal,
      };
    });

    res.json({
      items,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Return complete cart with all items
    const cartItems = await CartItem.find({ userId: req.user.id }).populate('productId');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        _id: item._id,
        product: item.productId,
        quantity: item.quantity,
        itemTotal,
      };
    });

    res.json({
      items,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({ userId: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
