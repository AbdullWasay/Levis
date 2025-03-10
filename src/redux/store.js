import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"
import productReducer from "./slices/productslice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
   
  },
})

