import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// api base url - changes based on environment
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

// async thunk to fetch products from backend
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch products');
            }
            
            return data.products;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// product slice for managing products state
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default productSlice.reducer;
