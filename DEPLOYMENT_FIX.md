# Vercel Deployment Fix - Step by Step

## ✅ Fixed Issues:
1. ✅ Backend configured for Vercel serverless functions
2. ✅ MongoDB connection optimized for serverless (connection caching)
3. ✅ CORS updated to work with frontend domain
4. ✅ Proper API structure for Vercel

## 🚀 Deployment Steps:

### Step 1: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Create New Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - **IMPORTANT**: Set **Root Directory** to `backend`
   - Framework Preset: **Other**

3. **Set Environment Variables** (in Vercel Dashboard):
   - `MONGO_URI` = `mongodb+srv://chitral:aadhya%402003%40%40@login.p5yvdtm.mongodb.net/event-ticketing`
   - `JWT_SECRET` = `your_strong_random_secret_here` (generate a random string)
   - `FRONTEND_URL` = (we'll set this after frontend deploys)
   - `NODE_ENV` = `production`

4. **Deploy Backend**
   - Click "Deploy"
   - Wait for deployment to complete
   - **Copy the backend URL** (e.g., `https://your-backend.vercel.app`)

### Step 2: Update MongoDB Atlas

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Network Access** → **Add IP Address**
3. **Add**: `0.0.0.0/0` (allows all IPs - needed for Vercel)
4. **Save**

### Step 3: Deploy Frontend to Vercel

1. **Create Another Project in Vercel**:
   - Click "Add New" → "Project"
   - Import the same GitHub repository
   - **IMPORTANT**: Set **Root Directory** to `frontend`
   - Framework Preset: **Vite**

2. **Set Environment Variables**:
   - `VITE_API_URL` = `https://your-backend.vercel.app/api` (use your actual backend URL)

3. **Deploy Frontend**
   - Click "Deploy"
   - Wait for deployment
   - **Copy the frontend URL**

### Step 4: Update Backend with Frontend URL

1. **Go back to Backend Project in Vercel**
2. **Settings** → **Environment Variables**
3. **Update** `FRONTEND_URL` = `https://your-frontend.vercel.app`
4. **Redeploy Backend**

### Step 5: Test

1. **Test Backend**: Visit `https://your-backend.vercel.app/api/health`
   - Should return: `{"success":true,"message":"Server is running",...}`

2. **Test Frontend**: Visit your frontend URL
   - Should load the login page

## 🔧 Troubleshooting:

### If Backend Shows Errors:
- Check environment variables are set correctly
- Check MongoDB connection string (password encoding)
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check Vercel function logs in dashboard

### If Frontend Can't Connect to Backend:
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Verify backend URL is accessible
- Check browser console for errors

### Common Issues:
1. **"MongoDB connection failed"**: 
   - Check IP whitelist in MongoDB Atlas
   - Verify password encoding in connection string

2. **"CORS error"**:
   - Update `FRONTEND_URL` in backend environment variables
   - Redeploy backend

3. **"404 Not Found"**:
   - Verify root directory is set correctly (`backend` or `frontend`)
   - Check `vercel.json` files exist

## 📝 Quick Checklist:

- [ ] Backend deployed to Vercel
- [ ] Environment variables set in backend (MONGO_URI, JWT_SECRET)
- [ ] MongoDB Atlas IP whitelist updated (0.0.0.0/0)
- [ ] Backend health check works
- [ ] Frontend deployed to Vercel
- [ ] VITE_API_URL set in frontend environment variables
- [ ] FRONTEND_URL set in backend environment variables
- [ ] Both apps working correctly

## 🎯 After Deployment:

Your app will be live at:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend API**: `https://your-backend.vercel.app/api`

You can now:
1. Sign up as an organizer
2. Create events
3. Share event links for public registration
4. Manage registrations

---

**Need Help?** Check Vercel deployment logs in the dashboard for detailed error messages.

