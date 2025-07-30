import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB1Hyoj1mh61dy6fhnho57Bxy1KK1nQH2g",
  authDomain: "permitswise.firebaseapp.com",
  projectId: "permitswise",
  storageBucket: "permitswise.firebasestorage.app",
  messagingSenderId: "196218379652",
  appId: "1:196218379652:web:160861dea9a52d894dd1d1",
  measurementId: "G-35W29R1R9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 