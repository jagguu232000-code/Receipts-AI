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

## Enable Google OAuth (Optional)

Google OAuth via Supabase requires additional setup:

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Add your Supabase domain to authorized redirect URIs:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```

2. **Configure Supabase OAuth:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Navigate to Authentication → Providers → Google
   - Enable Google provider
   - Paste your Google OAuth Client ID and Client Secret
   - Save

3. **Test:**
   - Users can now sign up with Google on your app

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
