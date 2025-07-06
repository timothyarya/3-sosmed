Here’s your refined **README.md** with separate cloning instructions for the frontend and backend branches:

---

# 🌟 Social Media Full Stack Web Application 🌟

Welcome to the **Social Media Full Stack Web Application**! This project is a modern, scalable, and feature-rich social media platform built with **Next.js** for the frontend and **Express.js** for the backend API. Whether you're looking to connect with friends, share posts, or explore trending content, this app has you covered!

---

## 🛠️ Tech Stack

### **Frontend**

- **Next.js** (React-based framework for SSR & performance)
- **Tailwind CSS** (Responsive, utility-first styling)
- **Zustand** (Lightweight state management)
- **React Query** (Data fetching & caching)
- **Next-auth** (Authentication)

### **Backend**

- **Express.js** (REST API framework)
- **Prisma & SQLite** (ORM + SQL database)
- **JWT** (Secure authentication)

### **Tools**

- **Postman** (API testing)
- **ESLint + Prettier** (Code quality)

---

## ✨ Features

✅ User Auth (JWT) | 📱 Responsive Design | 📝 Post Creation  
💬 Real-time Chat | 🔔 Notifications | 🔍 Search & Explore

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v16+)
- Git

### **Installation (Separate Repos)**

#### **1. Clone Frontend (Next.js)**

```bash
git clone -b frontend https://github.com/yourusername/social-media-app.git frontend
cd frontend && npm install
```

#### **2. Clone Backend (Express.js)**

```bash
git clone -b backend https://github.com/yourusername/social-media-app.git backend
cd backend && npm install
```

#### **3. Set Up Environment Variables**

- **Frontend**: Create `.env.local` in `/frontend`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
  NEXTAUTH_SECRET=your_jwt_secret_here
  NEXTAUTH_URL=http://localhost:3000
  ```
- **Backend**: Create `.env` in `/backend`:

  ```env
  DATABASE_URL="file:./dev.db"

  ```

#### **4. Run the Apps**

- **Backend**:

  ```bash
  cd backend && npm run dev
  ```

  _(API runs on `http://localhost:5000`)_

- **Frontend**:
  ```bash
  cd frontend && npm run dev
  ```
  _(App runs on `http://localhost:3000`)_

---

## 📂 Project Structure

**Will get updated**

```
📦 social-media-app
├── 📂 frontend   # Next.js app
│   ├── 📂 app  # Routes
│       ├── 📂 components  # Routes
│       └── 📂 store  # Zustand state
│       └── 📂 api
│       └── 📂 providers
└── 📂 backend    # Express.js API
    ├── 📂 prisma # Database schema
    └── 📂 routes # API endpoints
    └── 📂 controllers # API Controllers
```

---

## 🤝 Contributing

🔹 **Issues**: Report bugs/features [here](#).  
🔹 **PRs**: Follow [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📜 License

MIT © [Joshua Ravael](https://github.com/JoshuaRVLS)  
MIT © [Timothy Arya](https://github.com/timothyarya)

---

## 🌍 Live Demo

🚀 _Coming soon!_

---
