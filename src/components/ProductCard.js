"use client"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../redux/slices/cartSlice"
import { Button } from "./ui/Button"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ product, quantity: 1 }))
  }

  return (
    <div className="product-card group relative">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart size={18} className="text-gray-600" />
            </button>
          </div>
          {product.featured && (
            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">Featured</div>
          )}
        </div>

        <div className="mt-3">
          <h3 className="font-medium text-lg">{product.name}</h3>

          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < Math.floor(product.averageRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">
              {product.averageRating ? product.averageRating.toFixed(1) : "No ratings"}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
            <Button
              size="small"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart size={16} className="mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard

