# 🚀 Quick Vercel Deployment Guide

## ⚡ Fastest Way to Deploy

### Backend Deployment:

1. **Vercel Dashboard** → New Project
2. **Import Git Repository** (your repo)
3. **Root Directory**: `backend` ⚠️ IMPORTANT!
4. **Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://chitral:aadhya%402003%40%40@login.p5yvdtm.mongodb.net/event-ticketing
   JWT_SECRET=generate_a_random_string_here
   ```
5. **Deploy** → Copy backend URL

### Frontend Deployment:

1. **Vercel Dashboard** → New Project
2. **Import Same Repository**
3. **Root Directory**: `frontend` ⚠️ IMPORTANT!
4. **Framework**: Vite (auto-detected)
5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
6. **Deploy** → Copy frontend URL

### Update Backend:

1. Go to **Backend Project** → Settings → Environment Variables
2. Add: `FRONTEND_URL=https://your-frontend-url.vercel.app`
3. **Redeploy** backend

### MongoDB Atlas:

1. **Network Access** → Add IP Address
2. Add: `0.0.0.0/0`
3. **Save**

## ✅ Done!

Your app is now live:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app/api`

---

**For detailed steps, see `DEPLOYMENT_FIX.md`**

