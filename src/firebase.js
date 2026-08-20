import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration using Vite environment variables with hardcoded fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZNr-fATrEXpkHA8lNkFPoZOkzpUh1zz0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bawraskillhouse.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bawraskillhouse",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gs://bawraskillhouse-media",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "111375002726",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:111375002726:web:dc2d36f607ad27286111a7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Z3D1WXD0G3"
};


// Clean storageBucket prefix gs:// if present, as the SDK configuration expects only the bucket name/host
const cleanedStorageBucket = firebaseConfig.storageBucket && firebaseConfig.storageBucket.startsWith('gs://')
  ? firebaseConfig.storageBucket.replace('gs://', '')
  : firebaseConfig.storageBucket;

// Initialize Firebase
const app = initializeApp({
  ...firebaseConfig,
  storageBucket: cleanedStorageBucket
});

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Safe initialization of Analytics (suppressed on localhost, dev IP addresses, and unsupported environments)
let analytics = null;
if (typeof window !== 'undefined') {
  const hostname = window.location.hostname;
  const isLocalOrIP =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) ||
    hostname.endsWith('.local');

  if (!isLocalOrIP) {
    try {
      isSupported()
        .then((supported) => {
          if (supported) {
            analytics = getAnalytics(app);
          }
        })
        .catch((err) => {
          console.warn('Firebase Analytics is not supported in this environment:', err);
        });
    } catch (err) {
      console.warn('Firebase Analytics initialization skipped:', err);
    }
  }
}

export { app, auth, db, storage, googleProvider, analytics };


console.log("Firebase Connected Successfully", app.name);
export default app;
