# Fix: Google OAuth Redirect URI Error

## The Problem

You're seeing: `qehuzirdhznjjwjqhzmy.supabase.co refused to connect`

This happens when Google OAuth's redirect URI doesn't match what's authorized in Google Cloud Console.

---

## The Solution

You need to authorize your **localhost** URL in Google Cloud Console.

### Step 1: Get Your Exact Redirect URIs

For **Local Development:**
```
http://localhost:3000/
```

For **Vercel Deployment** (later):
```
https://your-vercel-app.vercel.app/
```

### Step 2: Add to Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 application (Web application)
5. Under **Authorized redirect URIs**, add BOTH:
   ```
   http://localhost:3000/
   https://your-vercel-app.vercel.app/
   ```
   (You can add the Vercel one later when you deploy)
6. Click **Save**

**Important:** The URI must match **exactly** including:
- `http://` vs `https://`
- Port number (`:3000`)
- Trailing slash (`/`)

### Step 3: Verify in Supabase (Already Done)

Your Supabase is already configured with the OAuth provider enabled. No changes needed there.

### Step 4: Test Locally

1. Save your changes in Google Cloud Console (wait a few seconds for propagation)
2. Go back to your app at `http://localhost:3000/`
3. Try clicking "Sign up with Google account"
4. You should now see the Google login popup

---

## Authorized Redirect URIs Checklist

Your Google Cloud OAuth app should have these URIs authorized:

- [ ] `http://localhost:3000/` (for local testing)
- [ ] `https://your-vercel-app.vercel.app/` (for production, add later)

**Do NOT add:**
- ❌ Just `localhost:3000` (missing protocol)
- ❌ `http://localhost:3000` (missing trailing slash)
- ❌ `http://localhost:3000/#/` (extra hash)

---

## Still Not Working?

### Check These:

1. **Wait for propagation:**
   - Google Cloud changes can take 30 seconds to propagate
   - Try clearing browser cache (Ctrl+Shift+Delete)
   - Try incognito mode

2. **Check exact URL match:**
   - Browser shows: `http://localhost:3000/`
   - Google Cloud has: `http://localhost:3000/` ✅

3. **Verify Supabase OAuth is enabled:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Authentication → Providers → Google
   - Toggle should be ON
   - Client ID and Secret should be saved

4. **Check browser console for errors:**
   - Press F12
   - Go to Console tab
   - Look for error messages
   - Screenshot any errors

---

## Full List of All Redirect URIs You Might Need

Add these to Google Cloud Console as needed:

**Local Development:**
```
http://localhost:3000/
http://localhost:3001/
http://127.0.0.1:3000/
```

**Vercel Production:**
```
https://your-app-name.vercel.app/
https://your-domain.com/
```

(Only add the ones you actually use)

---

## After It Works

Once Google OAuth works locally:

1. Test signing up with Google
2. Verify user appears in Supabase Dashboard
3. Then deploy to Vercel:
   ```bash
   npm run build
   vercel deploy
   ```

---

## Summary

| Component | Status | Action |
|-----------|--------|--------|
| Supabase OAuth | ✅ Configured | No action needed |
| Google OAuth App | ✅ Created | No action needed |
| Authorized URIs | ❌ Missing localhost | **ADD** `http://localhost:3000/` |
| Client ID | ✅ In Supabase | No action needed |
| Client Secret | ✅ In Supabase | No action needed |

---

**Next Step:** Add `http://localhost:3000/` to Google Cloud authorized redirect URIs

Then test again!
