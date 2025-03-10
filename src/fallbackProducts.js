const fallbackProducts = [
  {
    name: "Classic Denim Jacket",
    price: 89.99,
    description: "A timeless denim jacket that never goes out of style. Made with premium denim fabric for durability and comfort.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Clothing",
    featured: true,
    stock: 45,
    averageRating: 4.7,
    ratings: [
      {
        rating: 5,
        review: "Great quality and fits perfectly!",
        date: "2023-10-15T00:00:00.000Z"
      },
      {
        rating: 4,
        review: "Nice jacket, slightly larger than expected.",
        date: "2023-09-22T00:00:00.000Z"
      }
    ],
    createdAt: "2023-08-10T00:00:00.000Z",
    updatedAt: "2023-08-10T00:00:00.000Z"
  },
  {
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    description: "Experience premium sound quality with these wireless noise-cancelling headphones. Perfect for music lovers and travelers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Electronics",
    featured: true,
    stock: 28,
    averageRating: 4.8,
    ratings: [
      {
        rating: 5,
        review: "Best headphones I've ever owned!",
        date: "2023-10-05T00:00:00.000Z"
      },
      {
        rating: 5,
        review: "The noise cancellation is incredible.",
        date: "2023-09-18T00:00:00.000Z"
      },
      {
        rating: 4,
        review: "Great sound but battery life could be better.",
        date: "2023-08-30T00:00:00.000Z"
      }
    ],
    createdAt: "2023-07-15T00:00:00.000Z",
    updatedAt: "2023-07-15T00:00:00.000Z"
  },
  {
    name: "Smartwatch with Fitness Tracker",
    price: 149.99,
    description: "Track your daily activities, heart rate, and sleep with this stylish smartwatch.",
    image: "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",

    category: "Electronics",
    featured: false,
    stock: 60,
    averageRating: 4.5,
    ratings: [
      {
        rating: 5,
        review: "Amazing smartwatch with accurate tracking!",
        date: "2023-09-12T00:00:00.000Z"
      },
      {
        rating: 4,
        review: "Battery life is decent but could be better.",
        date: "2023-08-20T00:00:00.000Z"
      }
    ],
    createdAt: "2023-06-25T00:00:00.000Z",
    updatedAt: "2023-06-25T00:00:00.000Z"
  },
  {
    name: "Running Shoes",
    price: 120.00,
    description: "Lightweight and comfortable running shoes designed for maximum performance.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Footwear",
    featured: true,
    stock: 38,
    averageRating: 4.6,
    ratings: [
      {
        rating: 5,
        review: "Super comfortable and great for running!",
        date: "2023-10-01T00:00:00.000Z"
      },
      {
        rating: 4,
        review: "Good grip, but takes time to break in.",
        date: "2023-09-15T00:00:00.000Z"
      }
    ],
    createdAt: "2023-07-10T00:00:00.000Z",
    updatedAt: "2023-07-10T00:00:00.000Z"
  }
];

module.exports = fallbackProducts;
