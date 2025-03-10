// productlist.js
"use client"

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fallbackProducts from "../fallbackProducts"; // Import fallback products
import { fetchProducts } from "../redux/slices/productslice";
import ProductCard from "./ProductCard";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/Checkbox";
import { Label } from "./ui/Label";
import { Slider } from "./ui/Slider";

const ProductList = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.products)

  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 1000],
  })

  const [showFilters, setShowFilters] = useState(false)

  const categories = ["Clothing", "Shoes", "Accessories", "Electronics", "Home", "Beauty"]

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const newCategories = prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category]

      return { ...prev, category: newCategories }
    })
  }

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 1000],
    })
  }

  // Ensure fallback products are used if the API fails
  const productsToDisplay = status === "failed" || items.length === 0 ? fallbackProducts : items;

  const filteredProducts = productsToDisplay.filter((product) => {
    // Filter by category
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }

    // Filter by price
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    return true
  })

  if (status === "loading") return <div className="loading">Loading products...</div>

  return (
    <div className="product-list-container">
      {status === "failed"}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={18} className="mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`filters-sidebar ${showFilters ? "block" : "hidden"} md:block bg-white p-4 rounded-lg shadow-sm`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button className="md:hidden text-gray-500" onClick={() => setShowFilters(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="ml-2 text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <Slider
              min={0}
              max={1000}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="my-4"
            />
            <div className="flex justify-between text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          <Button variant="outline" size="small" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </div>

        <div className="products-grid col-span-1 md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="no-products text-center py-12">
              <p className="text-lg">No products match your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.name} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
