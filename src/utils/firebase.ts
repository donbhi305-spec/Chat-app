import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from "firebase/auth";

// Public Firebase config variables from app config file or env vars
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "AIzaSyD3_mEMZIkyyyMDHbUv3HEPZRIJRfhGRj0",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "peaceful-effect-fsc93.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "peaceful-effect-fsc93",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "peaceful-effect-fsc93.firebasestorage.app",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "502695064464",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || "1:502695064464:web:131e4e874a8b8f32b6f915"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth: Auth = getAuth(app);

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
};

export type { User };
