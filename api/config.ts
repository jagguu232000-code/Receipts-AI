export default function handler(req: any, res: any) {
  res.status(200).json({
    firebase: {
      apiKey: process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VITE_FIREBASE_APP_ID,
    },
    geminiApiKey: process.env.GEMINI_API_KEY,
    appUrl: process.env.APP_URL,
    gumroadProductId: process.env.GUMROAD_PRODUCT_ID,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  });
}