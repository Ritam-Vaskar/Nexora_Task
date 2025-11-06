import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Package, Shield, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Vibe Commerce</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                >
                  <Package className="w-5 h-5" />
                  <span>Orders</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Home
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  <Package className="w-5 h-5" />
                  <span>Orders</span>
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium py-2"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 mb-3 text-gray-700">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-600 font-medium w-full py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
