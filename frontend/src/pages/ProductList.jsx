import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

// Main product listing page with category filtering
const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Get unique categories from products
    const categories = [...new Set(products.map(product => product.category))];

    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 min-h-[90vh] flex items-center">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-fuchsia-500/15 rounded-full blur-[150px] animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-400/30 mb-8">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                            </span>
                            <span className="text-sm font-semibold text-purple-200">🔥 New Collection Available</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            Discover Your
                            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Perfect Style</span>
                        </h1>
                        
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300/80 mb-12 leading-relaxed font-light">
                            Explore our curated collection of premium products. From beauty essentials to lifestyle accessories, find everything you need.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a 
                                href="#products" 
                                className="group px-10 py-4 bg-white text-gray-900 font-bold rounded-full shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                            >
                                <span>Shop Now</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a 
                                href="#products"
                                className="px-10 py-4 text-white font-semibold rounded-full border-2 border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
                            >
                                View Categories
                            </a>
                        </div>

                        {/* Stats with better styling */}
                        <div className="flex items-center justify-center gap-8 md:gap-16 mt-20 pt-10 border-t border-white/10">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white">500+</div>
                                <div className="text-sm text-gray-400 font-medium mt-1">Products</div>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-white">50k+</div>
                                <div className="text-sm text-gray-400 font-medium mt-1">Customers</div>
                            </div>
                            <div className="w-px h-12 bg-white/20"></div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-white">4.9</div>
                                <div className="text-sm text-gray-400 font-medium mt-1">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafafa"/>
                    </svg>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div>
                            <span className="text-sm font-bold text-purple-600 tracking-widest uppercase">Our Collection</span>
                            <h2 className="text-4xl font-black text-gray-900 mt-2">Trending Products</h2>
                            <p className="text-gray-500 mt-2 max-w-lg">
                                {selectedCategory === 'all' 
                                    ? 'Handpicked items that are flying off the shelves. Don\'t miss out!'
                                    : `Showing ${filteredProducts.length} products in ${selectedCategory}`
                                }
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white cursor-pointer hover:border-purple-300 transition-colors"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                                selectedCategory === 'all'
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            All Products
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-32">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-purple-200 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            <p className="mt-6 text-gray-500 font-medium">Loading amazing products...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="max-w-md mx-auto py-16 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
                            <p className="text-gray-500 mb-6">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* No products in category */}
                    {!loading && !error && filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">Try selecting a different category</p>
                            <button 
                                onClick={() => setSelectedCategory('all')}
                                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
                            >
                                View All Products
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductList;
