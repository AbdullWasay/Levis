import { Search, ShoppingCart } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Navbar = () => {
  const { items } = useSelector((state) => state.cart)
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav
      style={{
        backgroundColor: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div>
  <Link to="/">
    <img src="/logo.png" alt="Levi's" className="h-15  w-auto" />
  </Link>
</div>


        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "20px",
            padding: "5px 10px",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            style={{
              border: "none",
              outline: "none",
              padding: "5px",
              fontSize: "14px",
            }}
          />
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Search size={20} />
          </button>
        </div>

        {/* Links */}
        <div>
        <Link
            to="/"
            style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
          >
            Products
          </Link>
          
         
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "black", margin: "0 10px" }}
          >
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          
          <Link
            to="/cart"
            style={{ textDecoration: "none", color: "black", position: "relative" }}
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 7px",
                  fontSize: "12px",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
