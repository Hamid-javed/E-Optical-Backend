const mongoose = require("mongoose");
const Product = require("../model/productSchema"); 

mongoose.connect(
    "mongodb://localhost:27017/E-Optical"
  )
    .then(() => {
      console.log("Connected To MongoDB")
    })
    .catch((err) => {
      console.log(err.stack)
    });

// Sample products to seed
const sampleProducts = [
    // Men
    {
        name: "Men's Classic Aviator Sunglasses",
        description: "Timeless aviator sunglasses with UV protection.",
        category: "Men",
        colors: ["Gold", "Silver"],
        size: "Large",
        stock: 15,
        price: 79.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "John Doe", email: "john@example.com", review: "Great quality sunglasses!" },
            { rating: 4, name: "Jane Smith", email: "jane@example.com", review: "Stylish and comfortable." },
        ],
    },
    {
        name: "Men's Rectangular Glasses",
        description: "Sleek rectangular glasses suitable for everyday wear.",
        category: "Men",
        colors: ["Black", "Brown"],
        size: "Medium",
        stock: 10,
        price: 49.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Alice", email: "alice@example.com", review: "Very lightweight and stylish." },
        ],
    },
    {
        name: "Men's Sporty Sunglasses",
        description: "Durable sunglasses designed for sports and outdoor activities.",
        category: "Men",
        colors: ["Black"],
        size: "Large",
        stock: 8,
        price: 89.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Michael", email: "michael@example.com", review: "Perfect for my outdoor activities!" },
        ],
    },
    {
        name: "Men's Wire Frame Glasses",
        description: "Lightweight wire frame glasses for a classic style.",
        category: "Men",
        colors: ["Gold", "Silver"],
        size: "Medium",
        stock: 12,
        price: 39.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 3, name: "Dave", email: "dave@example.com", review: "Decent glasses for the price." },
        ],
    },

    // Women
    {
        name: "Women's Cat Eye Sunglasses",
        description: "Stylish cat eye sunglasses with UV protection.",
        category: "Women",
        colors: ["Black", "Pink"],
        size: "Small",
        stock: 12,
        price: 49.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Emily", email: "emily@example.com", review: "Love these! Perfect for summer." },
        ],
    },
    {
        name: "Women's Oversized Round Glasses",
        description: "Trendy oversized round glasses for a chic look.",
        category: "Women",
        colors: ["Brown", "Tortoise"],
        size: "Large",
        stock: 10,
        price: 69.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Sophie", email: "sophie@example.com", review: "Super fashionable and great fit." },
        ],
    },
    {
        name: "Women's Fashionable Reading Glasses",
        description: "Stylish reading glasses with a lightweight frame.",
        category: "Women",
        colors: ["Blue", "Clear"],
        size: "Medium",
        stock: 20,
        price: 29.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Kate", email: "kate@example.com", review: "Perfect for reading and stylish!" },
        ],
    },
    {
        name: "Women's Stylish Square Glasses",
        description: "Trendy square glasses for a modern look.",
        category: "Women",
        colors: ["Black", "Red"],
        size: "Medium",
        stock: 15,
        price: 45.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Mia", email: "mia@example.com", review: "Great for everyday use." },
        ],
    },

    // Child
    {
        name: "Children's Fun Sunglasses",
        description: "Colorful sunglasses designed for kids.",
        category: "Child",
        colors: ["Blue", "Pink"],
        size: "Small",
        stock: 18,
        price: 19.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Charlie", email: "charlie@example.com", review: "My kids love these sunglasses!" },
        ],
    },
    {
        name: "Children's Round Frame Glasses",
        description: "Adorable round frame glasses for children.",
        category: "Child",
        colors: ["Green", "Yellow"],
        size: "Small",
        stock: 15,
        price: 24.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Ella", email: "ella@example.com", review: "Very cute and fit well." },
        ],
    },
    {
        name: "Children's Sporty Sunglasses",
        description: "Durable and fun sunglasses for active kids.",
        category: "Child",
        colors: ["Red"],
        size: "Small",
        stock: 20,
        price: 29.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Lucas", email: "lucas@example.com", review: "Great for outdoor play!" },
        ],
    },
    {
        name: "Children's Clear Lens Glasses",
        description: "Stylish clear lens glasses for kids.",
        category: "Child",
        colors: ["Pink", "Purple"],
        size: "Small",
        stock: 10,
        price: 19.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Perfect for school!" },
        ],
    },

    // Sunglasses
    {
        name: "Classic Wayfarer Sunglasses",
        description: "Iconic wayfarer sunglasses for all occasions.",
        category: "Sunglasses",
        colors: ["Black", "Brown"],
        size: "Medium",
        stock: 20,
        price: 59.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Tom", email: "tom@example.com", review: "These are my favorite sunglasses!" },
        ],
    },
    {
        name: "Mirrored Aviator Sunglasses",
        description: "Stylish aviator sunglasses with mirrored lenses.",
        category: "Sunglasses",
        colors: ["Silver"],
        size: "Large",
        stock: 8,
        price: 69.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Sarah", email: "sarah@example.com", review: "Very stylish and reflective." },
        ],
    },
    {
        name: "Polarized Sports Sunglasses",
        description: "Lightweight polarized sunglasses for clarity and comfort.",
        category: "Sunglasses",
        colors: ["Gray"],
        size: "Large",
        stock: 10,
        price: 79.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "James", email: "james@example.com", review: "Perfect for sports activities!" },
        ],
    },
    {
        name: "Fashionable Oversized Sunglasses",
        description: "Chic oversized sunglasses perfect for summer.",
        category: "Sunglasses",
        colors: ["Black"],
        size: "Large",
        stock: 15,
        price: 89.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Rebecca", email: "rebecca@example.com", review: "Stylish and trendy!" },
        ],
    },

    // Eyeglasses
    {
        name: "Bifocal Eyeglasses",
        description: "Bifocal glasses for those who need dual prescriptions.",
        category: "Eyeglasses",
        colors: ["Gray"],
        size: "Medium",
        stock: 10,
        price: 49.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Nancy", email: "nancy@example.com", review: "Very helpful for reading and distance." },
        ],
    },
    {
        name: "Lightweight Wire Frame Eyeglasses",
        description: "Minimalist wire frame glasses for a classic style.",
        category: "Eyeglasses",
        colors: ["Gold", "Silver"],
        size: "Medium",
        stock: 12,
        price: 39.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Steve", email: "steve@example.com", review: "Perfect for my style!" },
        ],
    },
    {
        name: "Trendy Blue Light Blocking Eyeglasses",
        description: "Stylish glasses designed to block blue light from screens.",
        category: "Eyeglasses",
        colors: ["Black"],
        size: "Medium",
        stock: 20,
        price: 39.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 5, name: "Laura", email: "laura@example.com", review: "Helped reduce my eye strain!" },
        ],
    },
    {
        name: "Retro Round Eyeglasses",
        description: "Vintage-inspired round eyeglasses for a trendy look.",
        category: "Eyeglasses",
        colors: ["Brown", "Black"],
        size: "Medium",
        stock: 5,
        price: 54.99,
        images: [
            "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
        ],
        reviews: [
            { rating: 4, name: "Cathy", email: "cathy@example.com", review: "Love the retro style!" },
        ],
    },
];


// Function to seed the database
const seedDatabase = async () => {
    try {
        await Product.deleteMany(); 
        await Product.insertMany(sampleProducts); 
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        mongoose.connection.close(); 
    }
};

seedDatabase();
