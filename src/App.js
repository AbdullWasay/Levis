"use client"

import { useDispatch } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"


// Components
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar"
import NotFound from "./components/NotFound"
import OrderConfirmation from "./components/OrderConfirmation"
import ProductDetail from "./components/ProductDetail"
import ProductList from "./components/ProductList"


function App() {
  const dispatch = useDispatch()



  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

