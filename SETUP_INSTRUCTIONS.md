# Complete Setup Instructions for Receipts AI

## Current Status

✅ **Email/Password Authentication:** Fully working  
✅ **User Database:** Supabase with Row Level Security  
✅ **AI Generation:** Google Gemini integration ready  
⏳ **Google OAuth:** Needs Client Secret configuration

## What You Need To Do

### Step 1: Get Your Google OAuth Client Secret

You have the **Client ID**, but you need the **Client Secret** from Google Cloud:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click on your project dropdown (top of page)
3. Go to **APIs & Services** → **Credentials**
4. Find the OAuth 2.0 application with Client ID: `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`
5. Click the application name to open it
6. Copy the **Client Secret** value

### Step 2: Configure Supabase Google OAuth

1. Open your [Supabase Dashboard](https://app.supabase.com)
2. Select your project: **Receipts AI** or whatever you named it
3. Go to **Authentication** (left sidebar)
4. Click **Providers**
5. Find **Google** and click it
6. Toggle **Enable Google** to ON
7. Paste:
   - **Client ID:** `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`
   - **Client Secret:** (from Step 1)
8. Click **Save**

### Step 3: Verify Google Cloud Configuration

Your Google Cloud OAuth app must have the correct redirect URI authorized:

1. In Google Cloud Console → **Credentials**
2. Click your OAuth application
3. Under **Authorized redirect URIs**, make sure this exists:
   ```
   https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback
   ```
   (This is your Supabase domain + `/auth/v1/callback`)
4. If not there, click **Add URI** and paste it
5. Click **Save**

### Step 4: Test Locally

1. Run your app:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000`

3. Click "Sign up with Google account"

4. You should see the Google login popup

5. After successful login, you'll be redirected back to your app logged in

### Step 5: Deploy to Vercel

Once working locally:

```bash
npm run build
vercel deploy
```

Your Vercel domain will automatically work because Supabase OAuth is configured at the Supabase level (not your domain level).

---

## If Google OAuth Still Doesn't Work

### Check These Things:

1. **Is Google provider enabled in Supabase?**
   - Dashboard → Authentication → Providers → Google
   - Should show a green toggle (ON)

2. **Did you paste the right Client Secret?**
   - It should be a long string (50+ characters)
   - Don't confuse with Client ID

3. **Check browser console for errors:**
   - Press F12 in your browser
   - Go to **Console** tab
   - Try signing in with Google again
   - Look for red error messages

4. **Check Supabase logs:**
   - Dashboard → Logs
   - Look for auth-related errors

### Common Issues:

| Problem | Solution |
|---------|----------|
| Blank screen after clicking Google button | Check browser console for errors, verify Supabase OAuth is enabled |
| "redirect_uri_mismatch" error | Make sure Google Cloud has exactly: `https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback` |
| "invalid_client" error | Double-check Client ID and Client Secret are correct and properly pasted |
| Google button doesn't appear | Check that AuthScreen component imported correctly from supabaseClient |

---

## Architecture Overview

```
User → Your App (Vite) → Supabase Auth
                      ↓
                   (Google OAuth)
                      ↓
                   Google Accounts
```

When user clicks "Sign up with Google":
1. Your app calls `supabase.auth.signInWithOAuth({ provider: 'google' })`
2. Supabase uses your Client ID to authenticate with Google
3. Google shows login popup to user
4. User logs in → redirected to your redirect URI
5. Supabase handles the callback
6. User is logged in to your app

---

## Files You Changed/Added

- ✅ `src/components/AuthScreen.tsx` - Google OAuth button + handler
- ✅ `src/supabaseClient.ts` - Supabase client setup
- ✅ `supabase/migrations/20260525093046_setup_auth_and_users_table.sql` - User table with RLS
- ✅ `.env` - Supabase configuration
- ✅ `vercel.json` - Vercel SPA routing config

---

## Next Steps (After OAuth Works)

1. Test user signup/login flow
2. Test profile updates
3. Deploy to Vercel
4. Set up analytics (optional)
5. Configure email notifications (optional)

---

## Support Files

- 📖 `SUPABASE_OAUTH_SETUP.md` - Detailed OAuth setup guide
- 📖 `README.md` - General project info
- 💻 `.env` - Your Supabase credentials

