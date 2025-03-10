import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// Fetch products from backend
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get("http://localhost:5000/api/products")
  return response.data
})

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk("products/fetchById", async (id) => {
  const response = await axios.get(`http://localhost:5000/api/products/${id}`)
  return response.data
})

// Add product to cart (this will be handled by cartSlice)
export const addToCart = (payload) => ({
  type: "cart/addToCart",
  payload,
})

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload
        state.status = "succeeded"
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default productSlice.reducer

