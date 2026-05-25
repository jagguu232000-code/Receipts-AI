<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Receipts AI - SaaS Copy Generation Platform

This app helps marketing professionals and copywriters instantly transform client wins into high-converting social media assets using AI.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Enable Google OAuth

Google OAuth requires configuring Supabase with your Google credentials.

**You have:** Google Client ID `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`

**Quick Setup:**

1. Get your Google Client Secret from [Google Cloud Console](https://console.cloud.google.com) (APIs & Services → Credentials)
2. Go to [Supabase Dashboard](https://app.supabase.com) → Authentication → Providers → Google
3. Enable Google and paste:
   - Client ID: `278257332604-nku3een6t0n0m8sv5imuiu3fir0qcb5u.apps.googleusercontent.com`
   - Client Secret: (paste from step 1)
4. Save and test!

See `SETUP_INSTRUCTIONS.md` for detailed steps.

## Deploy to Vercel

```bash
npm run build
vercel deploy
```

## Architecture

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Auth:** Supabase Email/Password + OAuth
- **Database:** Supabase PostgreSQL with Row Level Security
- **AI:** Google Gemini API for copy generation
- **Hosting:** Vercel (static + serverless)

## Features

- Email/password authentication
- User profile management
- AI-powered copywriting asset generation
- Multiple tones and styles
- Export to social platforms
- Offline support with localStorage persistence
