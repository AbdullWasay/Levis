"use client"

import { ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchProducts } from "../redux/slices/productslice"
import ProductCard from "./ProductCard"
import { Button } from "./ui/Button"

const HomePage = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Get featured products
  const featuredProducts = items.filter((product) => product.featured).slice(0, 4)

  // Get latest products
  const latestProducts = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)

  if (status === "loading") return <div className="loading">Loading...</div>

  return (
    <div className="home-page">
     <section 
  className="hero-section bg-cover bg-center bg-no-repeat text-white py-16 rounded-lg mb-12" 
  style={{ backgroundImage: "url('/bg.jpg')" }}
>
  <div className="container mx-auto px-4">
    <div className="max-w-xl">
      <h1 className="text-4xl font-bold mb-4">Welcome to Levi's</h1>
      <p className="text-lg mb-8">Discover the latest trends and high-quality products at affordable prices.</p>
      <Link to="/products">
        <Button size="large" className="bg-blue text-white-700 border-blue-600 hover:bg-blue-700">
          Shop Now
        </Button>
      </Link>
    </div>
  </div>
</section>

      {/* Featured Products Section */}
      <section className="featured-products mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            to="/products?category=Clothing"
            className="category-card bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
          >
            <div className="icon-placeholder h-12 w-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-600 text-xl">👕</span>
            </div>
            <h3 className="font-medium">Clothing</h3>
          </Link>

          <Link
            to="/products?category=Shoes"
            className="category-card bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
          >
            <div className="icon-placeholder h-12 w-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-600 text-xl">👟</span>
            </div>
            <h3 className="font-medium">Shoes</h3>
          </Link>

          <Link
            to="/products?category=Accessories"
            className="category-card bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
          >
            <div className="icon-placeholder h-12 w-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-600 text-xl">👜</span>
            </div>
            <h3 className="font-medium">Accessories</h3>
          </Link>

          <Link
            to="/products?category=Electronics"
            className="category-card bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
          >
            <div className="icon-placeholder h-12 w-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-600 text-xl">📱</span>
            </div>
            <h3 className="font-medium">Electronics</h3>
          </Link>

          <Link
            to="/products?category=Home"
            className="category-card bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
          >
            <div className="icon-placeholder h-12 w-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-600 text-xl">🏠</span>
            </div>
            <h3 className="font-medium">Home</h3>
          </Link>

          <Link
            to="/products?category=Beauty"
            className="category-card bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors"
          >
            <div className="icon-placeholder h-12 w-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-blue-600 text-xl">💄</span>
            </div>
            <h3 className="font-medium">Beauty</h3>
          </Link>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="latest-products mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link to="/products?sort=newest" className="text-blue-600 hover:underline flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="promotion-banner bg-gray-100 rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold mb-2">Special Offer</h2>
            <p className="text-gray-600 mb-4">Get 20% off on your first order with code: WELCOME20</p>
            <Link to="/products">
              <Button>Shop Now</Button>
            </Link>
          </div>
          <div className="w-full md:w-1/3">
  <img src="/so.png" alt="Special Offer" className="w-3/4 h-auto max-w-[200px] rounded-lg mx-auto" />
</div>

        </div>
      </section>
    </div>
  )
}

export default HomePage

