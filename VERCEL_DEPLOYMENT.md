# Vercel Deployment Guide

## 🚀 Project Status
✅ **Backend is running locally with MongoDB connected!**
✅ **Frontend is running on http://localhost:3000**

## 📦 Vercel Deployment Steps

### Backend Deployment (Vercel)

1. **Install Vercel CLI** (if not installed):
```bash
npm i -g vercel
```

2. **Navigate to backend folder**:
```bash
cd backend
```

3. **Login to Vercel**:
```bash
vercel login
```

4. **Deploy backend**:
```bash
vercel
```
   - Follow the prompts
   - When asked for environment variables, add:
     - `MONGO_URI` = `mongodb+srv://chitral:aadhya%402003%40%40@login.p5yvdtm.mongodb.net/event-ticketing`
     - `JWT_SECRET` = (choose a strong random string)
     - `PORT` = (Vercel will handle this automatically)

5. **Or deploy via Vercel Dashboard**:
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Set root directory to `backend`
   - Add environment variables:
     - `MONGO_URI`
     - `JWT_SECRET`
   - Deploy!

### Frontend Deployment (Vercel)

1. **Navigate to frontend folder**:
```bash
cd frontend
```

2. **Deploy frontend**:
```bash
vercel
```

3. **Update API URL**:
   - After backend deployment, you'll get a backend URL (e.g., `https://your-backend.vercel.app`)
   - Update `frontend/src/utils/api.js`:
   ```javascript
   const API_URL = 'https://your-backend.vercel.app/api';
   ```
   - Or set environment variable in Vercel:
     - `VITE_API_URL` = `https://your-backend.vercel.app/api`

4. **Redeploy frontend** after updating API URL

### Important Notes for Vercel:

1. **Backend Environment Variables** (set in Vercel dashboard):
   - `MONGO_URI` = Your MongoDB connection string
   - `JWT_SECRET` = A strong random string (use a password generator)

2. **Frontend Environment Variables**:
   - `VITE_API_URL` = Your backend Vercel URL + `/api`

3. **MongoDB Atlas IP Whitelist**:
   - Add `0.0.0.0/0` to allow all IPs (for Vercel)
   - Or add Vercel's IP ranges

4. **CORS**:
   - Backend already has CORS enabled
   - Make sure frontend URL is allowed in backend CORS config if needed

### Quick Deploy Commands:

**Backend:**
```bash
cd backend
vercel --prod
```

**Frontend:**
```bash
cd frontend
vercel --prod
```

### After Deployment:

1. **Test Backend**: Visit `https://your-backend.vercel.app/api/health`
2. **Test Frontend**: Visit your frontend Vercel URL
3. **Update Frontend API URL** to point to backend
4. **Redeploy Frontend**

## 🔧 Current Local Setup:

- ✅ Backend: http://localhost:5000
- ✅ Frontend: http://localhost:3000
- ✅ MongoDB: Connected

## 📝 Environment Variables for Vercel:

### Backend (.env in Vercel):
```
MONGO_URI=mongodb+srv://chitral:aadhya%402003%40%40@login.p5yvdtm.mongodb.net/event-ticketing
JWT_SECRET=your_strong_random_secret_here
```

### Frontend (Environment Variables in Vercel):
```
VITE_API_URL=https://your-backend-app.vercel.app/api
```

---

**Note**: Make sure MongoDB Atlas allows connections from Vercel's IP addresses!

