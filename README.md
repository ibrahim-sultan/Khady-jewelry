# Aura Luxe Jewelry Web Application

A premium jewelry boutique application featuring an administrative dashboard for inventory management and a high-end shopping experience for buyers.

## 🚀 How to push to GitHub

Since I am an AI, I cannot push directly to your account. Follow these steps to do it yourself:

1. **Create a GitHub Repository**: 
   - Go to [github.com/new](https://github.com/new).
   - Name it `aura-luxe-jewelry`.
   - Keep it Public or Private.
   - Do **not** initialize with a README (we have one here).

2. **Initialize Local Git**:
   Open your terminal in this project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aura Luxe Jewelry App"
   ```

3. **Link and Push**:
   Replace `YOUR_USERNAME` with your actual GitHub username:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aura-luxe-jewelry.git
   git push -u origin main
   ```

## 🛠️ Backend Setup (Node.js & MongoDB)

The app currently uses `localStorage` for the demo. To use the included `server.js` with MongoDB:

1. **Install Dependencies**:
   ```bash
   npm install express mongoose cors dotenv
   ```

2. **Configure MongoDB**:
   Create a `.env` file in the root:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Start the Server**:
   ```bash
   node server.js
   ```

## ✨ Features
- **Admin Panel**: Add, Edit, and Delete products. View paid customer orders and addresses.
- **Buyer View**: Elegant gallery, category filtering, and luxury UI.
- **Shopping Cart**: Real-time quantity updates and checkout flow.
- **Mock Payment**: Integrated "Pay Online" simulation that saves orders to the database.
