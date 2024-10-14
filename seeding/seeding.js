const mongoose = require("mongoose");
const Product = require("../model/productSchema");
const faker = require('@faker-js/faker');


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
// const sampleProducts = [
//     // Men
//     {
//         name: "Men's Classic Aviator Sunglasses",
//         description: "Timeless aviator sunglasses with UV protection.",
//         category: "Men",
//         variants: [
//             {
//                 color: "Gold",
//                 size: "Large",
//                 stock: 15,
//                 price: 79.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Silver",
//                 size: "Large",
//                 stock: 10,
//                 price: 84.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "John Doe", email: "john@example.com", review: "Great quality sunglasses!" },
//             { rating: 4, name: "Jane Smith", email: "jane@example.com", review: "Stylish and comfortable." },
//             { rating: 5, name: "Mark", email: "mark@example.com", review: "Perfect fit!" },
//             { rating: 4, name: "Lucas", email: "lucas@example.com", review: "Highly recommend for summer!" },
//             { rating: 3, name: "Emily", email: "emily@example.com", review: "A bit pricey but worth it." },
//         ],
//     },
//     {
//         name: "Men's Rectangular Glasses",
//         description: "Sleek rectangular glasses suitable for everyday wear.",
//         category: "Men",
//         variants: [
//             {
//                 color: "Black",
//                 size: "Medium",
//                 stock: 10,
//                 price: 49.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Brown",
//                 size: "Medium",
//                 stock: 5,
//                 price: 54.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 4, name: "Alice", email: "alice@example.com", review: "Very lightweight and stylish." },
//             { rating: 5, name: "Tom", email: "tom@example.com", review: "Great for daily wear!" },
//             { rating: 3, name: "Sarah", email: "sarah@example.com", review: "Average quality." },
//             { rating: 4, name: "Dave", email: "dave@example.com", review: "Good for the price." },
//             { rating: 4, name: "Sophie", email: "sophie@example.com", review: "I love the design!" },
//         ],
//     },
//     {
//         name: "Men's Sporty Sunglasses",
//         description: "Durable sunglasses designed for sports and outdoor activities.",
//         category: "Men",
//         variants: [
//             {
//                 color: "Black",
//                 size: "Large",
//                 stock: 8,
//                 price: 89.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Red",
//                 size: "Large",
//                 stock: 5,
//                 price: 94.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "Michael", email: "michael@example.com", review: "Perfect for my outdoor activities!" },
//             { rating: 4, name: "Chris", email: "chris@example.com", review: "Good protection from the sun." },
//             { rating: 5, name: "Anna", email: "anna@example.com", review: "Very comfortable!" },
//             { rating: 4, name: "Brian", email: "brian@example.com", review: "Solid build quality." },
//             { rating: 3, name: "Jessica", email: "jessica@example.com", review: "Could be lighter." },
//         ],
//     },
//     {
//         name: "Men's Wire Frame Glasses",
//         description: "Lightweight wire frame glasses for a classic style.",
//         category: "Men",
//         variants: [
//             {
//                 color: "Gold",
//                 size: "Medium",
//                 stock: 12,
//                 price: 39.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Silver",
//                 size: "Medium",
//                 stock: 10,
//                 price: 44.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 3, name: "Dave", email: "dave@example.com", review: "Decent glasses for the price." },
//             { rating: 4, name: "Tina", email: "tina@example.com", review: "Stylish and practical." },
//             { rating: 5, name: "Leo", email: "leo@example.com", review: "Very light and comfortable!" },
//             { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Good for work." },
//             { rating: 3, name: "Grace", email: "grace@example.com", review: "Not very durable." },
//         ],
//     },

//     // Women
//     {
//         name: "Women's Cat Eye Sunglasses",
//         description: "Stylish cat eye sunglasses with UV protection.",
//         category: "Women",
//         variants: [
//             {
//                 color: "Black",
//                 size: "Small",
//                 stock: 12,
//                 price: 49.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Pink",
//                 size: "Small",
//                 stock: 8,
//                 price: 54.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "Emily", email: "emily@example.com", review: "Love these! Perfect for summer." },
//             { rating: 4, name: "Sophia", email: "sophia@example.com", review: "Super cute design!" },
//             { rating: 5, name: "Mia", email: "mia@example.com", review: "Stylish and comfy!" },
//             { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Good for beach outings." },
//             { rating: 5, name: "Isabella", email: "isabella@example.com", review: "Amazing value!" },
//         ],
//     },
//     {
//         name: "Women's Oversized Round Glasses",
//         description: "Trendy oversized round glasses for a chic look.",
//         category: "Women",
//         variants: [
//             {
//                 color: "Brown",
//                 size: "Large",
//                 stock: 10,
//                 price: 69.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Tortoise",
//                 size: "Large",
//                 stock: 5,
//                 price: 74.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 4, name: "Sophie", email: "sophie@example.com", review: "Super fashionable and great fit." },
//             { rating: 5, name: "Chloe", email: "chloe@example.com", review: "I love the oversized look!" },
//             { rating: 4, name: "Ava", email: "ava@example.com", review: "Perfect for sunny days." },
//             { rating: 5, name: "Zoe", email: "zoe@example.com", review: "Really makes a statement." },
//             { rating: 4, name: "Lily", email: "lily@example.com", review: "Good quality for the price." },
//         ],
//     },
//     {
//         name: "Women's Fashionable Reading Glasses",
//         description: "Stylish reading glasses with a lightweight frame.",
//         category: "Women",
//         variants: [
//             {
//                 color: "Blue",
//                 size: "Medium",
//                 stock: 20,
//                 price: 29.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Clear",
//                 size: "Medium",
//                 stock: 15,
//                 price: 34.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "Kate", email: "kate@example.com", review: "Perfect for reading and stylish!" },
//             { rating: 4, name: "Emma", email: "emma@example.com", review: "Very lightweight!" },
//             { rating: 5, name: "Ella", email: "ella@example.com", review: "I get compliments all the time!" },
//             { rating: 4, name: "Grace", email: "grace@example.com", review: "Stylish and functional." },
//             { rating: 5, name: "Avery", email: "avery@example.com", review: "Best reading glasses I've had." },
//         ],
//     },
//     {
//         name: "Women's Stylish Square Glasses",
//         description: "Trendy square glasses for a modern look.",
//         category: "Women",
//         variants: [
//             {
//                 color: "Black",
//                 size: "Medium",
//                 stock: 15,
//                 price: 45.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Red",
//                 size: "Medium",
//                 stock: 10,
//                 price: 50.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 4, name: "Mia", email: "mia@example.com", review: "Great for everyday use." },
//             { rating: 5, name: "Sophie", email: "sophie@example.com", review: "Love the color options!" },
//             { rating: 4, name: "Ella", email: "ella@example.com", review: "Stylish and comfortable." },
//             { rating: 5, name: "Isabella", email: "isabella@example.com", review: "Perfect for my face shape." },
//             { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Very happy with my purchase!" },
//         ],
//     },

//     // Child
//     {
//         name: "Children's Fun Sunglasses",
//         description: "Colorful sunglasses designed for kids.",
//         category: "Child",
//         variants: [
//             {
//                 color: "Blue",
//                 size: "Small",
//                 stock: 18,
//                 price: 19.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Pink",
//                 size: "Small",
//                 stock: 15,
//                 price: 22.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "Charlie", email: "charlie@example.com", review: "My kids love these sunglasses!" },
//             { rating: 4, name: "Liam", email: "liam@example.com", review: "Great colors and fit." },
//             { rating: 5, name: "Noah", email: "noah@example.com", review: "Durable and fun!" },
//             { rating: 4, name: "Ethan", email: "ethan@example.com", review: "Perfect for summer outings." },
//             { rating: 5, name: "Sophia", email: "sophia@example.com", review: "Best purchase for my kids!" },
//         ],
//     },
//     {
//         name: "Children's Round Frame Glasses",
//         description: "Adorable round frame glasses for children.",
//         category: "Child",
//         variants: [
//             {
//                 color: "Green",
//                 size: "Small",
//                 stock: 15,
//                 price: 24.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Yellow",
//                 size: "Small",
//                 stock: 10,
//                 price: 27.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 4, name: "Ella", email: "ella@example.com", review: "Very cute and fit well." },
//             { rating: 5, name: "Ava", email: "ava@example.com", review: "My daughter loves them!" },
//             { rating: 4, name: "Chloe", email: "chloe@example.com", review: "Great for photos!" },
//             { rating: 5, name: "Sophie", email: "sophie@example.com", review: "Perfect for school!" },
//             { rating: 4, name: "Zoe", email: "zoe@example.com", review: "Good quality for kids." },
//         ],
//     },
//     {
//         name: "Children's Sporty Sunglasses",
//         description: "Durable and fun sunglasses for active kids.",
//         category: "Child",
//         variants: [
//             {
//                 color: "Red",
//                 size: "Small",
//                 stock: 20,
//                 price: 29.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Blue",
//                 size: "Small",
//                 stock: 18,
//                 price: 32.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "Lucas", email: "lucas@example.com", review: "Great for outdoor play!" },
//             { rating: 4, name: "Mia", email: "mia@example.com", review: "Very sturdy!" },
//             { rating: 5, name: "Ethan", email: "ethan@example.com", review: "My son loves them!" },
//             { rating: 4, name: "Ava", email: "ava@example.com", review: "Good for the price." },
//             { rating: 5, name: "Olivia", email: "olivia@example.com", review: "Highly recommend!" },
//         ],
//     },
//     {
//         name: "Children's Clear Lens Glasses",
//         description: "Stylish clear lens glasses for kids.",
//         category: "Child",
//         variants: [
//             {
//                 color: "Pink",
//                 size: "Small",
//                 stock: 10,
//                 price: 19.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Purple",
//                 size: "Small",
//                 stock: 8,
//                 price: 22.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Perfect for school!" },
//             { rating: 5, name: "Isabella", email: "isabella@example.com", review: "Stylish and cute!" },
//             { rating: 4, name: "Sophia", email: "sophia@example.com", review: "Good fit for my daughter." },
//             { rating: 5, name: "Ava", email: "ava@example.com", review: "My kid loves these!" },
//             { rating: 4, name: "Mia", email: "mia@example.com", review: "Great for everyday wear." },
//         ],
//     },

//     // Sunglasses
//     {
//         name: "Classic Wayfarer Sunglasses",
//         description: "Iconic wayfarer sunglasses for all occasions.",
//         category: "Sunglasses",
//         variants: [
//             {
//                 color: "Black",
//                 size: "Medium",
//                 stock: 20,
//                 price: 59.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Brown",
//                 size: "Medium",
//                 stock: 15,
//                 price: 64.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 5, name: "Tom", email: "tom@example.com", review: "These are my favorite sunglasses!" },
//             { rating: 4, name: "Jack", email: "jack@example.com", review: "Perfect for any outfit!" },
//             { rating: 5, name: "Liam", email: "liam@example.com", review: "Stylish and comfortable." },
//             { rating: 4, name: "Ethan", email: "ethan@example.com", review: "Good quality lenses." },
//             { rating: 5, name: "James", email: "james@example.com", review: "A must-have for summer!" },
//         ],
//     },
//     {
//         name: "Mirrored Aviator Sunglasses",
//         description: "Stylish aviator sunglasses with mirrored lenses.",
//         category: "Sunglasses",
//         variants: [
//             {
//                 color: "Silver",
//                 size: "Large",
//                 stock: 8,
//                 price: 69.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//             {
//                 color: "Gold",
//                 size: "Large",
//                 stock: 5,
//                 price: 74.99,
//                 image: [
//                     "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//                 ],
//             },
//         ],
//         reviews: [
//             { rating: 4, name: "Sarah", email: "sarah@example.com", review: "Very stylish and reflective." },
//             { rating: 5, name: "Laura", email: "laura@example.com", review: "I love the mirrored effect!" },
//             { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Great for sunny days." },
//             { rating: 5, name: "Sophia", email: "sophia@example.com", review: "Perfect for my vacation!" },
//             { rating: 4, name: "Emma", email: "emma@example.com", review: "Very comfortable to wear." },
//         ],
//     },
// ];

// const sampleProducts = [
//     // Men
//     {
//         name: "Men's Classic Aviator Sunglasses",
//         description: "Timeless aviator sunglasses with UV protection.",
//         category: "Men",
//         colors: ["Gold", "Silver"],
//         size: "Large",
//         stock: 15,
//         price: 79.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "John Doe", email: "john@example.com", review: "Great quality sunglasses!" },
//             { rating: 4, name: "Jane Smith", email: "jane@example.com", review: "Stylish and comfortable." },
//         ],
//     },
//     {
//         name: "Men's Rectangular Glasses",
//         description: "Sleek rectangular glasses suitable for everyday wear.",
//         category: "Men",
//         colors: ["Black", "Brown"],
//         size: "Medium",
//         stock: 10,
//         price: 49.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Alice", email: "alice@example.com", review: "Very lightweight and stylish." },
//         ],
//     },
//     {
//         name: "Men's Sporty Sunglasses",
//         description: "Durable sunglasses designed for sports and outdoor activities.",
//         category: "Men",
//         colors: ["Black"],
//         size: "Large",
//         stock: 8,
//         price: 89.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Michael", email: "michael@example.com", review: "Perfect for my outdoor activities!" },
//         ],
//     },
//     {
//         name: "Men's Wire Frame Glasses",
//         description: "Lightweight wire frame glasses for a classic style.",
//         category: "Men",
//         colors: ["Gold", "Silver"],
//         size: "Medium",
//         stock: 12,
//         price: 39.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 3, name: "Dave", email: "dave@example.com", review: "Decent glasses for the price." },
//         ],
//     },
//     // Women
//     {
//         name: "Women's Cat Eye Sunglasses",
//         description: "Stylish cat eye sunglasses with UV protection.",
//         category: "Women",
//         colors: ["Black", "Pink"],
//         size: "Small",
//         stock: 12,
//         price: 49.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Emily", email: "emily@example.com", review: "Love these! Perfect for summer." },
//         ],
//     },
//     {
//         name: "Women's Oversized Round Glasses",
//         description: "Trendy oversized round glasses for a chic look.",
//         category: "Women",
//         colors: ["Brown", "Tortoise"],
//         size: "Large",
//         stock: 10,
//         price: 69.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Sophie", email: "sophie@example.com", review: "Super fashionable and great fit." },
//         ],
//     },
//     {
//         name: "Women's Fashionable Reading Glasses",
//         description: "Stylish reading glasses with a lightweight frame.",
//         category: "Women",
//         colors: ["Blue", "Clear"],
//         size: "Medium",
//         stock: 20,
//         price: 29.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Kate", email: "kate@example.com", review: "Perfect for reading and stylish!" },
//         ],
//     },
//     {
//         name: "Women's Stylish Square Glasses",
//         description: "Trendy square glasses for a modern look.",
//         category: "Women",
//         colors: ["Black", "Red"],
//         size: "Medium",
//         stock: 15,
//         price: 45.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Mia", email: "mia@example.com", review: "Great for everyday use." },
//         ],
//     },
//     // Child
//     {
//         name: "Children's Fun Sunglasses",
//         description: "Colorful sunglasses designed for kids.",
//         category: "Children",
//         colors: ["Blue", "Pink"],
//         size: "Small",
//         stock: 18,
//         price: 19.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Charlie", email: "charlie@example.com", review: "My kids love these sunglasses!" },
//         ],
//     },
//     {
//         name: "Children's Round Frame Glasses",
//         description: "Adorable round frame glasses for children.",
//         category: "Children",
//         colors: ["Green", "Yellow"],
//         size: "Small",
//         stock: 15,
//         price: 24.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Ella", email: "ella@example.com", review: "Very cute and fit well." },
//         ],
//     },
//     {
//         name: "Children's Sporty Sunglasses",
//         description: "Durable and fun sunglasses for active kids.",
//         category: "Children",
//         colors: ["Red"],
//         size: "Small",
//         stock: 20,
//         price: 29.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Lucas", email: "lucas@example.com", review: "Great for outdoor play!" },
//         ],
//     },
//     {
//         name: "Children's Clear Lens Glasses",
//         description: "Stylish clear lens glasses for kids.",
//         category: "Children",
//         colors: ["Pink", "Purple"],
//         size: "Small",
//         stock: 10,
//         price: 19.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Olivia", email: "olivia@example.com", review: "Perfect for school!" },
//         ],
//     },
//     // Sunglasses
//     {
//         name: "Classic Wayfarer Sunglasses",
//         description: "Iconic wayfarer sunglasses for all occasions.",
//         category: "Sunglasses",
//         colors: ["Black", "Brown"],
//         size: "Medium",
//         stock: 20,
//         price: 59.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Tom", email: "tom@example.com", review: "These are my favorite sunglasses!" },
//         ],
//     },
//     {
//         name: "Mirrored Aviator Sunglasses",
//         description: "Stylish aviator sunglasses with mirrored lenses.",
//         category: "Sunglasses",
//         colors: ["Silver"],
//         size: "Large",
//         stock: 8,
//         price: 69.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Sarah", email: "sarah@example.com", review: "Very stylish and reflective." },
//         ],
//     },
//     {
//         name: "Polarized Sports Sunglasses",
//         description: "Lightweight polarized sunglasses for clarity and comfort.",
//         category: "Sunglasses",
//         colors: ["Gray"],
//         size: "Large",
//         stock: 10,
//         price: 79.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "James", email: "james@example.com", review: "Perfect for sports activities!" },
//         ],
//     },
//     {
//         name: "Fashionable Oversized Sunglasses",
//         description: "Chic oversized sunglasses perfect for summer.",
//         category: "Sunglasses",
//         colors: ["Black"],
//         size: "Large",
//         stock: 15,
//         price: 89.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Rebecca", email: "rebecca@example.com", review: "Stylish and trendy!" },
//         ],
//     },
//     // Eyeglasses
//     {
//         name: "Bifocal Eyeglasses",
//         description: "Bifocal glasses for those who need dual prescriptions.",
//         category: "Eyeglasses",
//         colors: ["Gray"],
//         size: "Medium",
//         stock: 10,
//         price: 49.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Nancy", email: "nancy@example.com", review: "Very helpful for reading and distance." },
//         ],
//     },
//     {
//         name: "Lightweight Wire Frame Eyeglasses",
//         description: "Minimalist wire frame glasses for a classic style.",
//         category: "Eyeglasses",
//         colors: ["Gold", "Silver"],
//         size: "Medium",
//         stock: 12,
//         price: 39.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Steve", email: "steve@example.com", review: "Perfect for my style!" },
//         ],
//     },
//     {
//         name: "Trendy Blue Light Blocking Eyeglasses",
//         description: "Stylish glasses designed to block blue light from screens.",
//         category: "Eyeglasses",
//         colors: ["Black"],
//         size: "Medium",
//         stock: 20,
//         price: 39.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 5, name: "Laura", email: "laura@example.com", review: "Helped reduce my eye strain!" },
//         ],
//     },
//     {
//         name: "Retro Round Eyeglasses",
//         description: "Vintage-inspired round eyeglasses for a trendy look.",
//         category: "Eyeglasses",
//         colors: ["Brown", "Black"],
//         size: "Medium",
//         stock: 5,
//         price: 54.99,
//         images: [
//             "https://easysight.pk/wp-content/webp-express/webp-images/uploads/2023/10/Eye-Glasses-699-300x300.jpg.webp",
//         ],
//         reviews: [
//             { rating: 4, name: "Cathy", email: "cathy@example.com", review: "Love the retro style!" },
//         ],
//     },
// ];
// console.log(faker);
const getRandomName = () => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
    return names[Math.floor(Math.random() * names.length)];
  };
  
  // Function to generate random emails
  const getRandomEmail = (name) => {
    const domains = ["example.com", "test.com", "sample.com"];
    return `${name.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
  };
  
  // Function to generate random review text
  const getRandomReview = () => {
    const reviews = [
      "Great product! Highly recommend.",
      "Not what I expected, but it works.",
      "Will buy again!",
      "Quality is average.",
      "Excellent service!",
      "I'm very satisfied with this purchase."
    ];
    return reviews[Math.floor(Math.random() * reviews.length)];
  };
  
  // Function to generate random date
  const getRandomDate = () => {
    const start = new Date(2020, 0, 1); // Starting from January 1, 2020
    const end = new Date(); // Current date
    return new Date(start.getTime() + Math.random() * (end - start));
  };
  
  // Function to create a random review
  const createRandomReview = () => {
    return {
      rating: Math.floor(Math.random() * 5) + 1, // Generates a random number between 1 and 5
      name: getRandomName(),
      email: getRandomEmail(getRandomName()),
      review: getRandomReview(),
      date: getRandomDate(),
    };
  };


// const seedProducts = async () => {
//     try {
//         await Product.deleteMany(); // Clear existing products
//         const products = Array.from({ length: 20 }, createRandomProduct); // Generate 20 random products
//         await Product.insertMany(products); // Insert all the products
//         console.log("Database seeded with products!");
//         mongoose.connection.close(); // Close the connection after seeding
//     } catch (err) {
//         console.error(err);
//     }
// };

const seedReviews = async () => {
    try {
      const products = await Product.find(); // Fetch all existing products
  
      for (let product of products) {
        const numReviews = Math.floor(Math.random() * 10) + 1; // Random number of reviews
        const reviews = Array.from({ length: numReviews }, createRandomReview);
  
        const avgRating =
          reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;
  
        // Update the product with new reviews, rating, and reviewCount
        product.reviews = reviews;
        product.rating = avgRating;
        product.reviewCount = reviews.length;
  
        await product.save(); // Save the updated product
      }
  
      console.log("Reviews seeded successfully!");
      mongoose.connection.close(); // Close the connection after seeding
    } catch (err) {
      console.error(err);
    }
  };

// Function to seed the database
// const seedDatabase = async () => {
//     try {
//         await Product.deleteMany(); 
//         await Product.insertMany(sampleProducts); 
//         console.log("Database seeded successfully");
//     } catch (error) {
//         console.error("Error seeding the database:", error);
//     } finally {
//         mongoose.connection.close(); 
//     }
// };

// seedDatabase();
// seedProducts()
seedReviews();
