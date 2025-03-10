import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"

const OrderConfirmation = () => {
  const { currentOrder } = useSelector((state) => state.orders)

  if (!currentOrder) {
    return (
      <div className="no-order">
        <h2>No order found</h2>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been received.</p>
      </div>

      <div className="order-details">
        <h2>Order Details</h2>
        <p>Order ID: {currentOrder._id}</p>
        <p>Date: {new Date(currentOrder.createdAt).toLocaleDateString()}</p>
        <p>Status: {currentOrder.status}</p>

        <h3>Items</h3>
        <div className="order-items">
          {currentOrder.items.map((item, index) => (
            <div key={index} className="order-item">
              <span>
                {item.quantity} x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="order-total">
          <h3>Total: ${currentOrder.totalAmount.toFixed(2)}</h3>
        </div>

        <h3>Shipping Address</h3>
        <div className="shipping-address">
          <p>
            {currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}
          </p>
          <p>{currentOrder.shippingAddress.address}</p>
          <p>
            {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{" "}
            {currentOrder.shippingAddress.zipCode}
          </p>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation

