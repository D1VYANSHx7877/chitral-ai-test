# Quick Setup Guide

## Important: Backend Environment Setup

Before running the backend, you **MUST** create a `.env` file in the `backend` directory with the following content:

```env
MONGO_URI=mongodb+srv://chitral:<PASSWORD>@login.p5yvdtm.mongodb.net/event-ticketing
JWT_SECRET=your_jwt_secret_here_change_this_in_production
PORT=5000
```

**Replace `<PASSWORD>` with your actual MongoDB Atlas password!**

## Running the Project

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Development Mode (Auto-reload)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## First Steps

1. **Create Organizer Account:**
   - Go to http://localhost:3000/signup
   - Create an organizer account

2. **Create an Event:**
   - After login, click "Create New Event"
   - Fill in event details
   - Choose approval mode (auto or manual)

3. **Register for Event (Public):**
   - Copy the event ID from the dashboard
   - Visit: http://localhost:3000/event/{eventId}
   - Register with name and email

4. **View Ticket:**
   - If auto-approved, you'll get a ticket ID
   - Visit: http://localhost:3000/ticket/{ticketId}

## Troubleshooting

### Backend won't start:
- Check if `.env` file exists in `backend` directory
- Verify MongoDB URI has correct password
- Check if port 5000 is already in use

### Frontend can't connect to backend:
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in `frontend/src/utils/api.js`

### MongoDB connection error:
- Verify your MongoDB Atlas password
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the database name is correct

