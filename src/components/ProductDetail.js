"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addToCart, fetchProductById } from "../redux/slices/productslice"

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct, status } = useSelector((state) => state.products)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [activeImage, setActiveImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    dispatch(addToCart({ product: selectedProduct, quantity }))

    // Simulate success animation
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  // Placeholder images for the gallery (in a real app, these would come from the product data)
  const productImages = [
    selectedProduct?.image || "/placeholder.svg"
  ]

  if (status === "loading") {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="md:w-1/2">
            <div className="bg-gray-200 rounded-lg aspect-square"></div>
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg w-1/4 aspect-square"></div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-10 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
          <p>We couldn't load the product information. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (!selectedProduct) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-10 text-center">
        <div className="bg-amber-50 text-amber-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-6 md:mt-10">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="hover:text-blue-600 transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/products" className="hover:text-blue-600 transition-colors">
              Products
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium truncate">{selectedProduct.name}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div
            className="relative rounded-xl overflow-hidden bg-white border shadow-sm aspect-square"
            style={{
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={productImages[activeImage] || "/placeholder.svg"}
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
            />
            {selectedProduct.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Sale
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {productImages.map((img, index) => (
              <button
                key={index}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === index ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${selectedProduct.name} view ${index + 1}`}
                  className="w-full aspect-square object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>

          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 ml-2 text-sm">4.8 (120 reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">${selectedProduct.price}</span>
            {selectedProduct.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">${selectedProduct.originalPrice}</span>
            )}
          </div>

          {/* Tabs for Product Information */}
          <div className="mb-6">
            <div className="flex border-b">
              {["description", "details", "shipping"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-medium text-sm transition-colors ${
                    activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="py-4">
              {activeTab === "description" && (
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct.description ||
                    "This premium product combines style, comfort, and durability. Made with high-quality materials, it's designed to enhance your everyday experience with its innovative features and elegant design."}
                </p>
              )}

              {activeTab === "details" && (
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Premium quality materials</li>
                  <li>Designed for comfort and durability</li>
                  <li>Easy to clean and maintain</li>
                  <li>Available in multiple colors and sizes</li>
                  <li>1-year manufacturer warranty</li>
                </ul>
              )}

              {activeTab === "shipping" && (
                <div className="text-gray-600">
                  <p className="mb-2">Free shipping on orders over $50.</p>
                  <p className="mb-2">Standard delivery: 3-5 business days</p>
                  <p>Express delivery: 1-2 business days (additional fee)</p>
                </div>
              )}
            </div>
          </div>

          {/* Color Options */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
            <div className="flex space-x-2">
              {["bg-gray-900", "bg-white border border-gray-300", "bg-blue-600", "bg-red-600"].map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-label={`Color option ${index + 1}`}
                />
              ))}
            </div>
          </div>

        
          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className={`px-3 py-1 ${quantity <= 1 ? "text-gray-400" : "text-gray-600 hover:text-gray-900"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isAddingToCart ? "bg-green-600" : ""
              }`}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Added!
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In stock and ready to ship
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
              Free shipping on orders over $50
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

