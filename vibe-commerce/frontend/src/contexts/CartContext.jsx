import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotal(0);
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get('/cart');
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, qty = 1) => {
    try {
      const { data } = await api.post('/cart', { productId, qty });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      throw error;
    }
  };

  const updateQty = async (itemId, qty) => {
    try {
      // Backend uses PUT for updating a cart item
      const { data } = await api.put(`/cart/${itemId}`, { qty });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart'); // Clear cart server-side
    } catch (e) {
      // Silently ignore; we'll still clear local state
    }
    setItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        loading,
        fetchCart,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
