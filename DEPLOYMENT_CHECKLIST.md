# Deployment Checklist

## Pre-Deployment (Local Testing)

- [ ] Install dependencies: `npm install`
- [ ] Run locally: `npm run dev`
- [ ] Test email signup
- [ ] Test email login
- [ ] Test password reset
- [ ] Test Google OAuth (if Client Secret configured)
- [ ] Build project: `npm run build`
- [ ] No build errors

## Google OAuth Setup (Required for Google Sign-in)

- [ ] Have Google Client ID: `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`
- [ ] Got Google Client Secret from Google Cloud Console
- [ ] Configured Supabase OAuth with Client ID and Client Secret
- [ ] Verified redirect URI in Google Cloud: `https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback`
- [ ] Google OAuth tested locally

## Supabase Configuration

- [ ] Supabase project created
- [ ] .env has correct VITE_SUPABASE_URL
- [ ] .env has correct VITE_SUPABASE_ANON_KEY
- [ ] Database migrations applied (users table created)
- [ ] RLS policies verified in Supabase dashboard

## Vercel Deployment

1. **Install Vercel CLI (if needed):**
   ```bash
   npm install -g vercel
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   vercel deploy
   ```

4. **Verify Deployment:**
   - [ ] App loads on Vercel domain
   - [ ] Email signup works
   - [ ] Email login works
   - [ ] Google OAuth works (if configured)
   - [ ] User data persists

## Post-Deployment

- [ ] Share Vercel URL with team
- [ ] Test on multiple devices/browsers
- [ ] Monitor Supabase logs for errors
- [ ] Set up error tracking (optional)
- [ ] Configure email notifications (optional)

## Important URLs

| Service | URL |
|---------|-----|
| Supabase Dashboard | https://app.supabase.com |
| Google Cloud Console | https://console.cloud.google.com |
| Vercel Dashboard | https://vercel.com/dashboard |

## Quick Reference

**Your Supabase Domain:**
```
https://0ec90b57d6e95fcbda19832f.supabase.co
```

**Your Google OAuth Redirect URI:**
```
https://0ec90b57d6e95fcbda19832f.supabase.co/auth/v1/callback
```

**Your Google Client ID:**
```
278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com
```

## Support

See these files for detailed help:
- `SETUP_INSTRUCTIONS.md` - Complete setup guide
- `GOOGLE_OAUTH_QUICK_SETUP.txt` - OAuth quick reference
- `SUPABASE_OAUTH_SETUP.md` - Detailed OAuth setup
- `CHANGES_MADE.md` - What was changed

---

**Status:** Ready for deployment ✅
