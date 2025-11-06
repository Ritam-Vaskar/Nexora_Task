import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  const [updating, setUpdating] = useState(false);

  const handleQtyChange = async (newQty) => {
    if (newQty < 1) return;
    setUpdating(true);
    try {
      await onUpdateQty(item._id, newQty);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    setUpdating(true);
    try {
      await onRemove(item._id);
    } finally {
      setUpdating(false);
    }
  };

  const subtotal = (item.product?.price || 0) * item.quantity;

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <img
        src={item.product?.image || 'https://via.placeholder.com/100'}
        alt={item.product?.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.product?.name}</h3>
        <p className="text-gray-600 text-sm mb-2">${item.product?.price?.toFixed(2)} each</p>

        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQtyChange(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-4 font-medium text-gray-900">{item.quantity}</span>
            <button
              onClick={() => handleQtyChange(item.quantity + 1)}
              disabled={updating}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={updating}
            className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Remove</span>
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

const Cart = () => {
  const { items, total, loading, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tax = total * 0.08;
  const grandTotal = total + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQty={updateQty}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
