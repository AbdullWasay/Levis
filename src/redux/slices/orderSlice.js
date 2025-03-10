import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const createOrder = createAsyncThunk("orders/create", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/orders", orderData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const fetchOrders = createAsyncThunk("orders/fetchAll", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading"
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.currentOrder = action.payload
        state.orders.push(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export default orderSlice.reducer

