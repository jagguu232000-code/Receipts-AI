/// <reference types="vite/client" />

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  // Check if credentials are placeholder values or missing
  const isPlaceholder = !apiKey || 
    apiKey === "YOUR_FIREBASE_API_KEY_HERE" || 
    apiKey === "" ||
    !authDomain || 
    authDomain === "your-project.firebaseapp.com" ||
    !projectId ||
    projectId === "your-project-id";
  
  if (isPlaceholder) {
    console.error(
      "🚨 FIREBASE CONFIGURATION ERROR 🚨\n\n" +
      "Google Sign-In will NOT work until you configure Firebase!\n\n" +
      "Steps to fix:\n" +
      "1. Go to https://console.firebase.google.com/\n" +
      "2. Create or select a project\n" +
      "3. Enable Google Authentication\n" +
      "4. Get your Firebase config from Project Settings\n" +
      "5. Update the .env file with your credentials\n\n" +
      "See SETUP_INSTRUCTIONS.md for detailed steps.\n\n" +
      "Users can still sign up using Email/Phone authentication."
    );
    return false;
  }
  return true;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Runtime debug: detect legacy project references and surface origin
const detectLegacyConfig = () => {
  try {
    const origin = typeof window !== "undefined" ? window.location.origin : "(no window)";
    console.log("🔎 Firebase config (runtime):", firebaseConfig);
    console.log("🔎 App origin:", origin);

    // Look for obvious legacy markers in any config value
    const found = Object.values(firebaseConfig).some((v: any) => {
      return typeof v === "string" && /velvet|velvety|pagoda/i.test(v);
    });

    if (found) {
      console.error("🚨 Legacy project reference detected in Firebase config. Initialization will be blocked to avoid talking to the old project.");
      return false;
    }
    return true;
  } catch (e) {
    // Non-fatal; let higher-level validation handle it
    return true;
  }
};

// Check configuration on module load
const isConfigValid = validateFirebaseConfig() && detectLegacyConfig();

// Initialize Firebase only if config is valid
let app: any = null;
let auth: any = null;
let googleProvider: GoogleAuthProvider | null = null;

try {
  if (isConfigValid) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.log("✅ Firebase initialized successfully");
  } else {
    console.warn("⚠️ Firebase not initialized - Google Sign-In disabled");
  }
} catch (error: any) {
  console.error("Firebase initialization error:", error.message);
}

export { auth, googleProvider };
export { signInWithPopup } from "firebase/auth";
export { isConfigValid as isFirebaseConfigured };
