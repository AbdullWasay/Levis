const express = require("express")
const Order = require("../Schemas/OrderSchema.js")
const router = express.Router()

// Create a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body)
    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a specific order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get orders by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.json(updatedOrder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router

