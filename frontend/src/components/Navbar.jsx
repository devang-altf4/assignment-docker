import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';

// Simple solid white navbar - Amazon style
const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);

    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl rotate-3 group-hover:rotate-6 transition-transform"></div>
                            <div className="absolute inset-0.5 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                            <span className="relative text-base z-10">💎</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold text-gray-900">Naksh Jewels</span>
                        </div>
                    </Link>

                    {/* Center Nav Links */}
                    <div className="flex items-center gap-1">
                        <Link 
                            to="/" 
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                isActive('/') 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Shop
                        </Link>

                        <Link 
                            to="/cart" 
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                isActive('/cart') 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <div className="relative">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                            Cart
                        </Link>
                    </div>

                    {/* Right - Auth */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
