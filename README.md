# SmartCareN - Healthcare Platform

SmartCareN is a comprehensive MERN stack healthcare web application. It provides patient appointment booking, doctor management, organ donation pledges, available donations (blood, equipment, medicine), and a chatbot assistant.

## Features
- **User Authentication:** JWT-based login and registration with role-based access control (User/Admin).
- **Appointment Booking:** Search for doctors, view available slots, and book appointments.
- **Admin Dashboard:** Manage doctors, review appointments, and moderate donation listings.
- **Donations Module:** Browse available medical resources, blood, and equipment.
- **Organ Donation Pledges:** Submit expressions of interest for organ donation.
- **AI Chatbot Fallback:** Rule-based chatbot (with Gemini AI integration capability) for answering healthcare platform queries.

## Tech Stack
- **Frontend:** React.js (Vite), React Router, Axios, Bootstrap 5, Context API
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs
- **Database:** MongoDB

## Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017 or a MongoDB Atlas URI)

## Setup Instructions

### 1. Database Setup
Ensure MongoDB is running locally or you have an Atlas connection string.

### 2. Backend Setup
```powershell
cd backend
npm install
```
Configure your `.env` file in the `backend` directory (already created with defaults):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/smartcare
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```powershell
cd frontend
npm install
```
Configure your `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Database Seeding (Optional)
To populate the database with initial doctors, donations, and an admin user:
```powershell
cd backend
npm run seed -- --force
```
**Default Admin Credentials:**
- Email: admin@smartcare.com
- Password: Admin@123

## Running the Application

Open two separate PowerShell terminals.

**Terminal 1 (Backend):**
```powershell
cd backend
npm run dev
```
*(Server will start on http://localhost:5000)*

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm run dev
```
*(Frontend will start on http://localhost:5173)*

## Deployment Readiness
- **Frontend:** Includes `vercel.json` for React Router history fallback. Deployable to Vercel.
- **Backend:** Uses environment variables for PORT and MongoDB connection strings. Includes CORS configurations. Deployable to Render or Heroku.
