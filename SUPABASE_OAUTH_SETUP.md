# Supabase Google OAuth Setup Guide

This guide explains how to configure Google OAuth in Supabase so users can sign in with their Google accounts.

## Prerequisites

You have:
- ✅ Supabase project created
- ✅ Google OAuth Client ID: `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`
- ❓ Google OAuth Client Secret (need to retrieve this)

## Step 1: Get Your Supabase Redirect URI

Your Supabase project redirect URI is:

```
https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback
```

This is constructed from your Supabase URL (from `.env`): `https://0ec90b57d6e95fcbda19832f.supabase.co`

## Step 2: Get Your Google OAuth Client Secret

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 application (the one with your Client ID)
4. Click on it to view details
5. Copy the **Client Secret** (keep this private!)

## Step 3: Configure Supabase OAuth

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Providers** → **Google**
4. Toggle **Enable Google** (turn ON)
5. Paste your credentials:
   - **Client ID:** `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`
   - **Client Secret:** (paste from step 2)
6. Click **Save**

## Step 4: Update Google Cloud Authorized Redirect URIs (If Needed)

If you haven't already added it:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. Click your OAuth app
4. Under **Authorized redirect URIs**, add:
   ```
   https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback
   ```
5. Click **Save**

## Step 5: Test

1. Navigate to your app (local or deployed)
2. Click **"Sign up with Google account"** button
3. Complete the Google authentication flow
4. You should be redirected back to your app and logged in

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Cloud Console matches exactly: `https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback`
- No trailing slashes or extra parameters

### Error: "invalid_client"
- Double-check Client ID and Client Secret are correct
- Verify they're for the correct OAuth application

### Blank screen after clicking Google sign-in
- Check browser console for errors (F12 → Console)
- Verify Supabase OAuth is enabled in dashboard
- Ensure credentials are saved properly

## Important Notes

⚠️ **Never commit your Client Secret to version control!** It's sensitive credentials.

✅ **Client ID is safe to share** (it's public)

✅ **Supabase handles the rest** - your app will automatically:
- Redirect to Google login
- Handle the OAuth callback
- Create user in Supabase
- Manage sessions

## Additional Configuration

### For Production (Vercel, etc.)

When deploying to production, ensure:

1. Your production domain is added to Google Cloud authorized redirect URIs (if different from local)
2. Supabase OAuth credentials are the same for all environments
3. No additional setup needed on Vercel - it uses your Supabase backend

### For Multiple Domains

If you have multiple domains (localhost, staging, production):

Add all of them to Google Cloud **Authorized redirect URIs**:
```
http://localhost:3000/auth/v1/callback
https://staging.yourapp.com/auth/v1/callback
https://yourapp.vercel.app/auth/v1/callback
```

(Replace with your actual domains)
