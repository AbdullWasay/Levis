import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import fallbackProducts from "../../fallbackProducts"; // Import fallback products

// Fetch products from backend
export const fetchProducts = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  } catch (error) {
    console.error("Database not connected, using fallback products.");
    return rejectWithValue(fallbackProducts); // Use fallback products on error
  }
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Database not connected, product not found.");
    return rejectWithValue(null);
  }
});

// Add product to cart (this will be handled by cartSlice)
export const addToCart = (payload) => ({
  type: "cart/addToCart",
  payload,
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle",
    error: null,
    dbConnected: true, // Track if the database is connected
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
        state.dbConnected = true; // DB is connected
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.items = action.payload; // Use fallback products
        state.status = "failed";
        state.error = "Database not connected";
        state.dbConnected = false; // DB is not connected
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProduct = null; // No product found
        state.status = "failed";
        state.error = "Product not found";
      });
  },
});

export default productSlice.reducer;
