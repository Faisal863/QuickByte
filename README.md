# 🍽️ QuickByte

**QuickByte** is a modern, web-based food ordering platform enhanced with a **nutrition-based chatbot recommendation system**. It helps users find meals that suit their dietary preferences and health goals — offering a smarter way to eat and order food.

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Express](https://img.shields.io/badge/Backend-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-brightgreen?logo=node.js)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Features

- ✅ **User-Friendly UI** using **React + TailwindCSS**
- 🤖 **Nutrition-Based Chatbot** (via OpenRouter API + LLM)
- 🔐 Secure Authentication with **JWT & bcrypt**
- 🍛 Intelligent meal recommendations (based on calories, carbs, protein, etc.)
- 🧾 **Admin Panel** to manage menus, categories, orders, and items
- 💳 **Stripe Payment Integration** for seamless checkout
- 📩 **Order Confirmation Emails** via **Nodemailer**
- 📦 Role-based panels: **User**, **Store Admin**, **Delivery Rider**, **Main Admin**
- 🌍 **Geolocation and Address Handling** (via OpenCage API)
- 🕒 Real-time Order Status Tracking

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | APIs/Libs |
|----------|---------|----------|------------|
| React.js | Express.js | MongoDB | OpenRouter API |
| JSX + TailwindCSS | Node.js | Mongoose | Stripe API |
| Axios, React Router | JWT, bcrypt, Multer | – | Nodemailer, OpenCage API |

---

## ⚙️ Installation

```bash
# Clone the repository
cd QuickByte

# Install server dependencies
cd backend
npm install

cd frontend
npm install

cd admin
npm install

# Start backend
npm start

# Start frontend
npm run dev

# Start admin
npm run dev



Example Chatbot Prompts
💬 "I’m diabetic. Suggest me meals with low sugar and carbs under 300 calories."
💬 "Give me a full healthy meal with rice, meat, and a drink."
💬 "List high-protein vegetarian dishes under ₹200."

✅ Multilingual support available (e.g., Hindi, Telugu, etc.)

🙋‍♂️ Author
Made with 💖 by Mohammed Faisal

This project is licensed under the MIT License.

