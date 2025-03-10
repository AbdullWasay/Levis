const express = require("express")
const Product = require("../Schemas/ProductSchema.js")

const router = express.Router()

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query

    // Build filter object
    const filter = {}

    if (category) {
      filter.category = category
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    // Build sort object
    let sortOption = {}

    if (sort === "price_asc") {
      sortOption = { price: 1 }
    } else if (sort === "price_desc") {
      sortOption = { price: -1 }
    } else if (sort === "newest") {
      sortOption = { createdAt: -1 }
    } else {
      // Default sort by featured
      sortOption = { featured: -1 }
    }

    const products = await Product.find(filter).sort(sortOption)
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Fetch a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add a product
router.post("/", async (req, res) => {
  const { name, price, description, image, category, featured, stock } = req.body
  const newProduct = new Product({
    name,
    price,
    description,
    image,
    category,
    featured: featured || false,
    stock: stock || 0,
  })

  try {
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get products by category
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Search products
router.get("/search/:query", async (req, res) => {
  try {
    const searchRegex = new RegExp(req.params.query, "i")
    const products = await Product.find({
      $or: [{ name: searchRegex }, { description: searchRegex }, { category: searchRegex }],
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router

