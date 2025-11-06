import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import Modal from '../components/Modal';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send customer name and email to backend
      const { data } = await api.post('/checkout', {
        customerName: formData.name,
        customerEmail: formData.email,
      });
      
      console.log('Order created successfully:', data);
      setOrderData(data);
      setOrderPlaced(true);
      
      // Clear local cart state (backend already cleared the cart)
      clearCart();
      
      // Show receipt modal
      setShowReceipt(true);
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to process order');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setOrderPlaced(false);
    navigate('/orders');
  };

  // if (items.length === 0 && !orderPlaced) {
  //   navigate('/cart');
  //   return null;
  // }

  const tax = total * 0.08;
  const grandTotal = total + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Order confirmation will be sent to this email
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By placing your order, you agree to our terms and conditions
              </p>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item._id} className="flex items-center space-x-4">
                  <img
                    src={item.product?.image || 'https://via.placeholder.com/80'}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product?.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
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
          </div>
        </div>
      </div>

      <Modal isOpen={showReceipt} onClose={handleCloseReceipt} title="Order Confirmed!" size="lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order!</h3>
          <p className="text-gray-600 mb-6">
            Your order has been successfully placed and is being processed.
          </p>

          {orderData && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono font-medium text-gray-900">
                    {orderData.orderId?.slice(-8) || orderData._id?.slice(-8) || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-bold text-gray-900">${orderData.total?.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Order Items</p>
                <div className="space-y-2">
                  {orderData.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Order placed on {new Date(orderData.timestamp).toLocaleString()}
              </p>
            </div>
          )}

          <button
            onClick={handleCloseReceipt}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View My Orders
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
