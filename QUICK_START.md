# Quick Start Guide

## ✅ Current Status

- ✅ Frontend is running on **http://localhost:3000**
- ⚠️  Backend needs MongoDB password configuration

## 🔧 Fix Backend Connection

The `.env` file in the `backend` folder has a placeholder for your MongoDB password. You need to replace `<PASSWORD>` with your actual MongoDB Atlas password.

### Option 1: Manual Edit (Recommended)

1. Open `backend/.env` file
2. Replace `<PASSWORD>` with your actual MongoDB Atlas password
3. Save the file
4. Restart the backend server

### Option 2: Use PowerShell Script

```powershell
cd backend
.\update-env.ps1 -Password "your_actual_password_here"
```

### Option 3: Quick PowerShell Command

```powershell
cd backend
$password = "your_actual_password_here"
(Get-Content .env) -replace '<PASSWORD>', $password | Set-Content .env
```

## 🚀 Start Servers

### Backend (Terminal 1):
```powershell
cd backend
npm start
```

### Frontend (Terminal 2):
```powershell
cd frontend
npm run dev
```

## 🌐 Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

## 📝 First Steps After Setup

1. **Sign Up:** Go to http://localhost:3000/signup and create an organizer account
2. **Create Event:** After login, create your first event
3. **Get Event ID:** Copy the event ID from the dashboard
4. **Public Registration:** Visit http://localhost:3000/event/{eventId} to register
5. **View Ticket:** Access your ticket at http://localhost:3000/ticket/{ticketId}

## ⚠️ Important Notes

- Make sure your MongoDB Atlas IP whitelist includes your current IP
- The JWT_SECRET in .env should be changed to a strong random string for production
- Both servers must be running for the app to work properly

