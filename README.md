# 🚀 JARVIS Virtual Assistant

## Overview
JARVIS is a full-stack virtual assistant built with a **Node.js + Express backend** and a **React + Vite frontend**.  

It includes user authentication, MongoDB integration, routing, API handling, and a clean project structure.

---

## ✨ Set Up
- User Authentication (JWT + bcrypt)
- MongoDB integration using Mongoose
- Protected backend API routes
- Express server with environment configuration
- React frontend built with Vite
- Routing using React Router DOM
- API requests handled via Axios
- Sign In & Sign Up UI pages

---

## 🔧 Tech Stack

### **Frontend**
- React
- Vite
- React Router DOM
- React Icons
- Axios

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cookie-parser
- multer
- cloudinary
- cors
- nodemon (development only)

---

## 📁 Project Structure

```
JARVIS_VIRTUAL_ASSISTANT/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── node_modules/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── .gitignore
```
---

## 🔧 Backend Setup (Node.js + Express)

```
express
mongoose
dotenv
nodemon
jsonwebtoken
bcryptjs
cookie-parser
cloudinary
multer
cors
```

### Key Files

- index.js → Express server, JSON parsing, env config, DB connection
- config/db.js → MongoDB connection logic
- models/user.model.js → User schema
- controllers/auth.controller.js → Login & register logic
- routes/auth.routes.js → Auth endpoints
- config/token.js → JWT generation

---
## 🎨 Frontend Setup (React + Vite)
```
react-router-dom
react-icons
axios
```

### Key Files

- React routing
- Sign In / Sign Up pages
- Axios setup for API requests
- Vite + JavaScript configuration

---

## 📦 Scripts (How to Run)

**Backend**
```
cd backend
npm run dev        # nodemon start
```

**Frontend**
```
cd frontend
npm run dev        # start Vite dev server
```

---
## 🔐 Environment Variables

`backend/.env`
```
PORT=5000
MONGODB_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

`frontend/.env` (optional for API base URL)
```
VITE_API_URL=http://localhost:5000
```
---
## 🧹 Git Ignore (Root)

Your root .gitignore ignores:

- backend node_modules
- frontend node_modules
- backend .env
- frontend .env
- dist/ and temporary files
- editor/OS configs

---
## 🚀 Next Steps Available

Coming Soon