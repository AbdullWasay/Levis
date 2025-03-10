"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { clearCart, removeFromCart, updateCartItemQuantity } from "../redux/slices/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, total } = useSelector((state) => state.cart)
  const [animatedItemId, setAnimatedItemId] = useState(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  // Calculate subtotal, tax, and shipping
  const subtotal = total
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
  const finalTotal = couponApplied ? (subtotal + tax + shipping) * 0.9 : subtotal + tax + shipping

  const handleRemoveItem = (id) => {
    setAnimatedItemId(id)
    
    // Delay actual removal to allow animation to complete
    setTimeout(() => {
      dispatch(removeFromCart(id))
      setAnimatedItemId(null)
    }, 300)
  }

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return
    dispatch(updateCartItemQuantity({ id, quantity }))
  }

  const handleClearCart = () => {
    if (showConfirmClear) {
      dispatch(clearCart())
      setShowConfirmClear(false)
    } else {
      setShowConfirmClear(true)
    }
  }

  const handleCancelClear = () => {
    setShowConfirmClear(false)
  }

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true)
    } else {
      alert("Invalid coupon code")
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process then navigate
    setTimeout(() => {
      setIsCheckingOut(false)
      navigate("/checkout") // Actually navigate to checkout
    }, 1000)
  }

  // Reset confirm clear when items change
  useEffect(() => {
    setShowConfirmClear(false)
  }, [items])

  if (items.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <div style={styles.emptyCartIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2 style={styles.emptyText}>Your cart is empty</h2>
        <p style={styles.emptySubtext}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products">
          <Button style={styles.continueButton}>
            <span style={styles.buttonIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </span>
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cartContainer}>
        <h1 style={styles.title}>Shopping Cart</h1>
        
        {/* Cart Header */}
        <div style={styles.cartHeader}>
          <div style={styles.headerProduct}>Product</div>
          <div style={styles.headerPrice}>Price</div>
          <div style={styles.headerQuantity}>Quantity</div>
          <div style={styles.headerTotal}>Total</div>
          <div style={styles.headerAction}></div>
        </div>
        
        {/* Cart Items */}
        <div style={styles.cartItems}>
          {items.map((item) => (
            <div 
              key={item.product._id} 
              style={{
                ...styles.cartItem,
                ...(animatedItemId === item.product._id ? styles.cartItemRemoving : {})
              }}
            >
              {/* Product Image and Name */}
              <div style={styles.itemProduct}>
                <div style={styles.itemImage}>
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    style={styles.image}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.product.name}</h3>
                  {item.product.color && <p style={styles.itemMeta}>Color: {item.product.color}</p>}
                  {item.product.size && <p style={styles.itemMeta}>Size: {item.product.size}</p>}
                </div>
              </div>

              {/* Price */}
              <div style={styles.itemPrice}>
                ${item.product.price.toFixed(2)}
                {item.product.originalPrice && (
                  <span style={styles.originalPrice}>${item.product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Quantity Control */}
              <div style={styles.itemQuantity}>
                <button
                  style={{
                    ...styles.quantityButton,
                    ...(item.quantity <= 1 ? styles.quantityButtonDisabled : {})
                  }}
                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                  style={styles.quantityButton}
                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>

              {/* Item Total */}
              <div style={styles.itemTotal}>
                <p style={styles.totalPrice}>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>

              {/* Remove Button */}
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveItem(item.product._id)}
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div style={styles.cartFooter}>
          {/* Cart Actions */}
          <div style={styles.cartActions}>
            <div style={styles.couponSection}>
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={styles.couponInput}
                disabled={couponApplied}
              />
              <button
                onClick={handleApplyCoupon}
                style={{
                  ...styles.couponButton,
                  ...(couponApplied ? styles.couponApplied : {})
                }}
                disabled={couponApplied}
              >
                {couponApplied ? "Applied" : "Apply Coupon"}
              </button>
              
            </div>
           
            <div style={styles.clearCartActions}>
              
              <button
                onClick={handleClearCart}
                style={showConfirmClear ? styles.clearCartButtonConfirm : styles.clearCartButton}
              >
                {showConfirmClear ? "Confirm Clear" : "Clear Cart"}
              </button>
              
              {showConfirmClear && (
                <button
                  onClick={handleCancelClear}
                  style={styles.cancelClearButton}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
           
          <button
                style={isCheckingOut ? styles.checkoutButtonLoading : styles.checkoutButton}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <span style={styles.loadingSpinner}></span>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>


        </div>
        
        {/* Continue Shopping Link */}
        <div style={styles.continueShopping}>
          <Link to="/products" style={styles.continueShoppingLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

// 🖌️ STYLES
const styles = {
  pageBackground: {
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  cartContainer: {
    width: "100%",
    maxWidth: "1400px", // Increased width
    margin: "0 auto",
    padding: "40px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "350",
    marginBottom: "40px",
    color: "#333",
    letterSpacing: "-0.5px",
  },
  cartHeader: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr 1.5fr 1fr 0.5fr",
    padding: "0 15px 15px",
    borderBottom: "2px solid #f0f0f0",
    fontWeight: "600",
    color: "#666",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  headerProduct: {},
  headerPrice: {
    textAlign: "center",
  },
  headerQuantity: {
    textAlign: "center",
  },
  headerTotal: {
    textAlign: "center",
  },
  headerAction: {},
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  cartItem: {
    display: "grid",
    gridTemplateColumns: "3fr 1fr 1.5fr 1fr 0.5fr",
    alignItems: "center",
    gap: "15px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    border: "1px solid #f0f0f0",
  },
  cartItemRemoving: {
    opacity: 0,
    transform: "translateX(20px)",
  },
  itemProduct: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  itemImage: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  },
  checkoutButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "16px",
    marginTop: "25px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
  },
  checkoutButtonLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    padding: "16px",
    marginTop: "25px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "not-allowed",
    boxShadow: "0 4px 8px rgba(108, 117, 125, 0.2)",
  },
  loadingSpinner: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    borderTopColor: "#fff",
    animation: "spin 1s ease-in-out infinite",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
  },
  itemMeta: {
    fontSize: "14px",
    color: "#666",
    margin: "4px 0",
  },
  itemPrice: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  originalPrice: {
    fontSize: "14px",
    textDecoration: "line-through",
    color: "#999",
    marginTop: "4px",
  },
  itemQuantity: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  quantityButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#333",
  },
  quantityButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  quantity: {
    fontSize: "18px",
    fontWeight: "600",
    width: "30px",
    textAlign: "center",
  },
  itemTotal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#333",
  },
  removeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "#fff",
    color: "#dc3545",
    border: "1px solid #dc3545",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cartFooter: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    marginTop: "40px",
    alignItems: "start",
  },
  cartActions: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  couponSection: {
    display: "flex",
    gap: "10px",
    maxWidth: "400px",
  },
  couponInput: {
    flex: 1,
    padding: "14px 18px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
  },
  couponButton: {
    padding: "0 24px",
    height: "48px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s",
    fontWeight: "600",
  },
  couponApplied: {
    backgroundColor: "#28a745",
    cursor: "default",
  },
  clearCartActions: {
    display: "flex",
    gap: "10px",
  },
  clearCartButton: {
    padding: "0 24px",
    height: "48px",
    backgroundColor: "#fff",
    color: "#dc3545",
    border: "1px solid #dc3545",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: "600",
  },
  clearCartButtonConfirm: {
    padding: "0 24px",
    height: "48px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "1px solid #dc3545",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  cancelClearButton: {
    padding: "0 24px",
    height: "48px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  continueShopping: {
    marginTop: "40px",
    textAlign: "center",
  },
  continueShoppingLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#007bff",
    fontSize: "16px",
    textDecoration: "none",
    transition: "color 0.2s",
    fontWeight: "600",
  },
  emptyCart: {
    maxWidth: "600px",
    margin: "80px auto",
    padding: "60px 40px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  },
  emptyCartIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
    color: "#6c757d",
  },
  emptyText: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  emptySubtext: {
    fontSize: "18px",
    color: "#6c757d",
    marginBottom: "40px",
  },
  continueButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 30px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
  },
  buttonIcon: {
    display: "flex",
    alignItems: "center",
  },
}

export default Cart
