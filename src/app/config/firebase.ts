// src/app/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Kiểm tra các biến môi trường Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Debug log để kiểm tra config (chỉ trong development)
if (import.meta.env.DEV) {
  console.log('🔥 Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? '✅ Set' : '❌ Missing',
    authDomain: firebaseConfig.authDomain ? '✅ Set' : '❌ Missing',
    projectId: firebaseConfig.projectId ? '✅ Set' : '❌ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✅ Set' : '❌ Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✅ Set' : '❌ Missing',
    appId: firebaseConfig.appId ? '✅ Set' : '❌ Missing',
  });
}

// Initialize Firebase
let app;
let storage;

try {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
  console.log('✅ Firebase Storage initialized successfully');
  console.log('📦 Storage bucket:', firebaseConfig.storageBucket);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

export { storage };
export default app;