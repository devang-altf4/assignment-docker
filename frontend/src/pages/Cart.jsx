import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../redux/cartSlice';
import CartItem from '../components/CartItem';

// Premium cart page
const Cart = () => {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [dispatch, isAuthenticated]);

    // Convert to INR (1 USD = 83 INR)
    const conversionRate = 83;
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0) * conversionRate;
    const shipping = subtotal > 8300 ? 0 : 499; // Free shipping over ₹8300
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    // Not logged in state
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-md w-full text-center">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/30 animate-float">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Your Cart is Locked</h2>
                    <p className="text-gray-500 text-lg mb-8">Please sign in to view your shopping cart and checkout.</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-full shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                    >
                        Sign In to Continue
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-md w-full text-center">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 text-lg mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-xl hover:bg-black hover:scale-105 transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-500 mt-2">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-10 lg:mt-0">
                        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900">₹{subtotal.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-gray-900">
                                        {shipping === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            `₹${shipping}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>GST (18%)</span>
                                    <span className="font-semibold text-gray-900">₹{tax.toFixed(0)}</span>
                                </div>
                                
                                {shipping > 0 && (
                                    <div className="py-3 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                        <p className="text-sm text-green-700">
                                            Add <span className="font-bold">₹{(8300 - subtotal).toFixed(0)}</span> more for FREE shipping!
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-3xl font-black text-gray-900">₹{total.toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="btn-shine w-full mt-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                                Proceed to Checkout
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-4 text-gray-400">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                                <span className="text-sm">Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
