import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// api base url
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

// helper to get token from localstorage
const getToken = () => localStorage.getItem('token');

// fetch cart items from server
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue('Please login first');
            }

            const response = await fetch(`${API_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch cart');
            }

            return data.items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// add item to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue('Please login first');
            }

            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.thumbnail,
                    quantity: 1
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to cart');
            }

            return data.item;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// update cart item quantity
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ id, quantity }, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue('Please login first');
            }

            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update cart');
            }

            return data.item;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// remove item from cart
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (id, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) {
                return rejectWithValue('Please login first');
            }

            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to remove item');
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// cart slice - manages all cart state
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                // check if item already in cart and update it
                const existingIndex = state.items.findIndex(
                    item => item.productId === action.payload.productId
                );
                if (existingIndex >= 0) {
                    state.items[existingIndex] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update cart item
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index >= 0) {
                    state.items[index] = action.payload;
                }
            })
            // remove from cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
