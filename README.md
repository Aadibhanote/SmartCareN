# SmartCareN — Healthcare Platform

SmartCareN is a modern, full-stack healthcare web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It supports patient appointment booking, doctor profile management, organ donation pledges, community medical resource listings (blood, equipment, medicines), and an AI-powered healthcare platform chatbot.

---

## Architecture & Technology Stack

- **Frontend:** React 18, Vite, Bootstrap 5, Axios, Context API, React Router v6, React Icons, React Toastify.
- **Backend:** Node.js (>= 18), Express.js, Mongoose, JWT authentication, bcryptjs, Helmet, Express Rate Limit, Cookie Parser.
- **Database:** MongoDB (Local instance or MongoDB Atlas cluster).
- **Authentication:** Dual-mode JWT authentication (HTTP-only cookies + `Authorization: Bearer <token>` in `localStorage`).
- **Deployment:** Frontend on **Vercel**, Backend on **Render.com**, Database on **MongoDB Atlas**.

---

## Project Structure

```text
SmartCareN/
├── render.yaml              # Render Blueprint configuration for automated backend deployment
├── .gitignore               # Comprehensive Git ignore (excludes all .env, node_modules, dist)
├── README.md
├── backend/
│   ├── .env                 # Local secrets (never committed to Git)
│   ├── .env.example         # Template with placeholder documentation
│   ├── package.json         # Node.js dependencies, scripts, engines
│   ├── scripts/
│   │   └── seed.js          # Safe database seeder (--force flag required to overwrite)
│   └── src/
│       ├── app.js           # Express app, CORS, security headers, rate limiting, route mounting
│       ├── server.js        # Server entry point with graceful shutdown & port binding
│       ├── config/          # MongoDB connection with diagnostic reporting
│       ├── controllers/     # Route business logic (auth, doctors, appointments, etc.)
│       ├── middleware/      # Auth, admin verification, rate limits, error handling
│       ├── models/          # Mongoose models (User, Doctor, Appointment, Donation, etc.)
│       ├── routes/          # Express route definitions
│       ├── services/        # Gemini AI & intelligent fallback chatbot service
│       └── validators/      # Express-validator schemas
└── frontend/
    ├── .env                 # Local frontend config (VITE_API_BASE_URL)
    ├── .env.example         # Template for local & production configurations
    ├── .eslintrc.cjs        # ESLint configuration
    ├── package.json         # React dependencies and build scripts
    ├── vercel.json          # Vercel SPA rewrites for client-side routing
    ├── vite.config.js       # Vite React configuration
    └── src/
        ├── App.jsx          # Protected and public routes
        ├── main.jsx         # App bootstrap with Bootstrap JS bundle & Toastify
        ├── context/         # AuthContext with dual-cookie/Bearer token persistence
        ├── services/        # Centralized Axios instance with request/response interceptors
        ├── components/      # Reusable UI cards, layout, navbar, chatbot
        └── pages/           # Pages (Home, Appointments, Admin, Profile, Contact, etc.)
```

---

## Local Development Setup

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally (`mongodb://127.0.0.1:27017/smartcare`) or a **MongoDB Atlas URI**

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   npm install
   ```
2. Create or verify `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://127.0.0.1:27017/smartcare
   JWT_SECRET=your_development_secret_at_least_32_characters
   FRONTEND_URL=http://localhost:5173
   AI_API_KEY=
   AI_MODEL=gemini-2.0-flash
   ADMIN_EMAIL=admin@smartcare.com
   ADMIN_PASSWORD=Admin@123
   ```
   *(Note: If connecting to MongoDB Atlas, ensure special characters in passwords such as `@` are URL-encoded as `%40`)*.

3. Optional: Seed initial test data (Admin user, 6 doctors, 4 donations):
   ```bash
   npm run seed -- --force
   ```

4. Start backend server:
   ```bash
   npm run dev
   # Server starts on http://localhost:5000
   ```

### 3. Frontend Setup
1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   npm install
   ```
2. Create or verify `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
3. Start frontend development server:
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

---

## Credentials for Testing

| Role | Email | Password | Access |
|---|---|---|---|
| **Admin** | `admin@smartcare.com` | `Admin@123` | Admin Portal (`/admin`), Doctor Management, Status Updates |
| **Test Patient** | `test@example.com` | `Test1234` | Appointment booking, Organ pledges, Profile |

---

## Production Deployment Guide

### Step 1: MongoDB Atlas Database Configuration
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Under **Security > Network Access**, click **Add IP Address** and add `0.0.0.0/0` (Allow access from anywhere).
3. Under **Security > Database Access**, verify your database user has read/write privileges.
4. Copy your connection string, append your database name (e.g., `/smartcareN`), and ensure special characters in the password are URL-encoded (`@` -> `%40`).

### Step 2: Deploy Backend on Render.com
1. Log in to [Render](https://dashboard.render.com/).
2. Click **New + > Web Service** and link your Git repository.
3. Configure the service:
   - **Name:** `smartcaren-api`
   - **Root Directory:** `backend` *(CRITICAL)*
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
4. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `MONGODB_URI` = `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET` = `<Generate a secure 32+ character random string>`
   - `FRONTEND_URL` = `<Temporary placeholder or leave blank until Step 3>`
5. Click **Create Web Service**.
6. When deployment finishes, copy your Render URL: e.g. `https://smartcaren-api.onrender.com`.
7. Verify health check in browser: `https://smartcaren-api.onrender.com/api/health`.

### Step 3: Deploy Frontend on Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New... > Project** and import your Git repository.
3. In Project Settings:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click Edit and select `frontend` *(CRITICAL)*
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = `https://smartcaren-api.onrender.com/api` *(your actual Render URL from Step 2 followed by /api)*
5. Click **Deploy**.
6. Vercel will build and deploy your app. Copy the live frontend domain: e.g. `https://smartcaren.vercel.app`.

### Step 4: Finalize CORS Configuration
1. Return to your Render Web Service dashboard &rarr; **Environment**.
2. Update `FRONTEND_URL` to match your Vercel domain:
   - `FRONTEND_URL` = `https://smartcaren.vercel.app`
3. Save changes. Render will automatically apply the changes and your cross-origin API calls will be fully operational.
