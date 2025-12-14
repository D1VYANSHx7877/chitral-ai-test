# Vercel Environment Variables Setup Guide

## Quick Setup (1 minute)

Follow these steps to enable signup functionality on your Vercel deployment:

### Method 1: Using Vercel Web Dashboard (Recommended)

1. **Login to Vercel**
   - Go to https://vercel.com/login
   - Sign in with GitHub

2. **Open Project Settings**
   - Click on your `chitral-ai-test` project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add MONGO_URI**
   - Click **Add New** button
   - **Name:** `MONGO_URI`
   - **Value:** `mongodb+srv://chitral:aadhya%402003%40%40@login.p5yvdtm.mongodb.net/event-ticketing?retryWrites=true&w=majority`
   - **Select Environments:** Check all three (Production, Preview, Development)
   - Click **Save**

4. **Add JWT_SECRET**
   - Click **Add New** button again
   - **Name:** `JWT_SECRET`
   - **Value:** `chitral_event_ticketing_secure_jwt_secret_key_2024_change_in_production`
   - **Select Environments:** Check all three (Production, Preview, Development)
   - Click **Save**

5. **Redeploy**
   - Click on the **Deployments** tab
   - Find the latest deployment
   - Click the three dots menu → **Redeploy**
   - Wait 2-3 minutes for redeploy to complete

### Method 2: Using Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link your project
vercel link

# Set environment variables
vercel env add MONGO_URI
# Paste: mongodb+srv://chitral:aadhya%402003%40%40@login.p5yvdtm.mongodb.net/event-ticketing?retryWrites=true&w=majority
# Select: all

vercel env add JWT_SECRET
# Paste: chitral_event_ticketing_secure_jwt_secret_key_2024_change_in_production
# Select: all

# Redeploy
vercel --prod
```

## Testing the Setup

After redeployment, test the signup at:
https://chitral-ai-test.vercel.app/signup

### Test Credentials
- **Name:** Test User
- **Email:** testuser@example.com
- **Password:** TestPassword123
- **Confirm Password:** TestPassword123

Click **Create account** - it should now work successfully!

## Troubleshooting

If signup still fails:

1. **Clear browser cache** - Press Ctrl+Shift+Delete and clear cache
2. **Wait for redeploy** - Vercel can take 2-5 minutes to finish
3. **Check the health endpoint** - Visit https://chitral-ai-test.vercel.app/api/health
   - Should return a JSON response (not an error)
4. **Verify environment variables are set** - Check Settings > Environment Variables in Vercel dashboard

## What These Variables Do

- **MONGO_URI:** Connection string to your MongoDB database. This allows the signup API to save user data.
- **JWT_SECRET:** Secret key used to create secure authentication tokens. Users need this to log in after signup.

## Security Notes

⚠️ **Important:** The credentials in `.env.example` are shared examples. For production:

1. Change the `JWT_SECRET` to a unique random string
2. Use a dedicated MongoDB user (not shared with other projects)
3. Regularly rotate these secrets
4. Never commit real `.env` file to git (it's already in `.gitignore`)

## Next Steps

After successful signup:

1. ✅ Create organizer account at `/signup`
2. ✅ Login at `/login`
3. ✅ Create events in the dashboard
4. ✅ Share event links with users
5. ✅ Users can register for events without account needed
