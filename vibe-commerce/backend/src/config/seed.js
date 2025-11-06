const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('../models/User');
const Product = require('../models/Product');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@vibecommerce.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'user@vibecommerce.com',
        password: 'user123',
        role: 'user',
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully');

    // Create products
    const products = [
      {
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'High-quality wireless headphones with noise cancellation',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category: 'Electronics',
        stock: 15,
      },
      {
        name: 'Smart Watch',
        price: 199.99,
        description: 'Feature-rich smartwatch with fitness tracking',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'Electronics',
        stock: 20,
      },
      {
        name: 'Laptop Backpack',
        price: 49.99,
        description: 'Durable backpack with laptop compartment',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'Accessories',
        stock: 30,
      },
      {
        name: 'Coffee Maker',
        price: 89.99,
        description: 'Programmable coffee maker with thermal carafe',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        category: 'Home',
        stock: 12,
      },
      {
        name: 'Yoga Mat',
        price: 29.99,
        description: 'Non-slip yoga mat with carrying strap',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        category: 'Fitness',
        stock: 25,
      },
      {
        name: 'Desk Lamp',
        price: 39.99,
        description: 'LED desk lamp with adjustable brightness',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
        category: 'Home',
        stock: 18,
      },
      {
        name: 'Water Bottle',
        price: 24.99,
        description: 'Insulated stainless steel water bottle',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
        category: 'Fitness',
        stock: 40,
      },
      {
        name: 'Bluetooth Speaker',
        price: 59.99,
        description: 'Portable bluetooth speaker with great sound',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        category: 'Electronics',
        stock: 22,
      },
      {
        name: 'Running Shoes',
        price: 119.99,
        description: 'Comfortable running shoes with cushioned sole',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        category: 'Fitness',
        stock: 16,
      },
      {
        name: 'Notebook Set',
        price: 19.99,
        description: 'Set of 3 premium notebooks',
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500',
        category: 'Stationery',
        stock: 35,
      },
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');

    console.log('\n=== Seed Complete ===');
    console.log('Admin credentials:');
    console.log('Email: admin@vibecommerce.com');
    console.log('Password: admin123');
    console.log('\nUser credentials:');
    console.log('Email: user@vibecommerce.com');
    console.log('Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
