import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

// Premium product card component
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.cart);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        dispatch(addToCart(product));
    };

    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 card-hover border border-gray-400">
            {/* Image Container */}
            <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                        -{Math.round(product.discountPercentage)}% OFF
                    </div>
                )}

                {/* Quick Add Button (Desktop) */}
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-colors disabled:bg-gray-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {loading ? 'Adding...' : 'Add to Cart'}
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-lg">
                        <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors">
                    {product.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Price & Mobile Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-2xl font-black text-gray-900">
                            ₹{(product.price * 83).toFixed(0)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                                ₹{((product.price / (1 - product.discountPercentage / 100)) * 83).toFixed(0)}
                            </span>
                        )}
                    </div>
                    
                    {/* Mobile Add Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="lg:hidden w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:from-gray-400 disabled:to-gray-400"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
