# Naksh Jewels - Mini E-commerce Module 💎

A full-stack e-commerce application built with **React**, **Redux Toolkit**, **Node.js**, **Express**, **MongoDB**, and **Docker**. This project demonstrates modern web development practices, clean code architecture, and containerized deployment.

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library with functional components only (no class components)
- **Redux Toolkit** - State management with async thunks for API calls
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework (as mentioned, its utility first so thats why we using it insted of writing custom css)
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - Database and ODM
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Environment Variables** - Secure configuration with .env

## 📁 Project Structure

```
assignment-docker/
├── backend/
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   └── validation.js   # Request validation
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Cart.js         # Cart schema
│   ├── routes/
│   │   ├── authRoutes.js   # Login/Register endpoints
│   │   ├── productRoutes.js# Product endpoints
│   │   └── cartRoutes.js   # Cart CRUD endpoints
│   ├── server.js           # Express app entry
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── CartItem.jsx
│   │   ├── pages/
│   │   │   ├── ProductList.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── productSlice.js
│   │   │   ├── cartSlice.js
│   │   │   └── authSlice.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## ✨ Features

### Frontend
- 📦 **Product Listing** - Grid display of products fetched from DummyJSON API
- 🛒 **Shopping Cart** - Add, update quantity, remove items
- 🔐 **User Authentication** - Login and Register pages
- 🎨 **Responsive Design** - Works on mobile and desktop
- ⚡ **Redux State Management** - Centralized state with async actions

### Backend
- 🔒 **JWT Authentication** - Secure token-based auth
- 🛡️ **Protected Routes** - Cart operations require authentication
- ✅ **Validation Middleware** - Request body validation
- ⚠️ **Error Handling** - Centralized error responses
- 🗄️ **MongoDB Persistence** - Cart data saved to database

## 🐳 Running with Docker (Recommended)

### Prerequisites
- Docker Desktop installed and running

### Steps

1. Clone the repository:
```bash
git clone <your-repo-url>
cd assignment-docker
```

2. Start all services:
```bash
docker-compose up --build
```

3. Access the application:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

4. To stop:
```bash
docker-compose down
```

## 💻 Running Locally (Without Docker)

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas connection string (already configured)

### Backend Setup

```bash
cd backend
npm install
npm start
```
Backend runs on http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Product Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |

### Cart Routes (Protected - requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:id` | Update item quantity |
| DELETE | `/api/cart/:id` | Remove item from cart |

## 🏗️ Architecture Highlights

### Why Redux Toolkit?
- **Simplified Redux** - Less boilerplate code compared to vanilla Redux
- **Async Thunks** - Built-in support for async operations
- **Immer Integration** - Write mutable code that produces immutable updates
- **DevTools Extension** - Easy debugging with Redux DevTools

### Why Tailwind CSS?
- **Utility-First** - Compose designs directly in markup
- **No Custom CSS Files** - Faster development
- **Responsive** - Built-in breakpoint utilities
- **Tree-Shaking** - Only ships CSS you actually use

### Modern DevOps Approach
- **Containerization** - Each service runs in isolated container
- **Docker Compose** - Single command to run entire stack
- **Environment Variables** - Secure configuration management
- **Production Ready** - Easy to deploy to cloud providers

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://hackathon:devik@cluster0.7uqagt1.mongodb.net/naksh_ecommerce?appName=Cluster0
JWT_SECRET=naksh_jewels_super_secret_key_2024
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'added amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

ISC License

---

Made with ❤️ for Naksh Jewels Internship Assessment
