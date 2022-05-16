import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQEIuCc4nfmgAlsNY3m9eyGBf1giunjCM',
  authDomain: 'cmp-capstone.firebaseapp.com',
  projectId: 'cmp-capstone',
  storageBucket: 'cmp-capstone.appspot.com',
  messagingSenderId: '478812076219',
  appId: '1:478812076219:web:78cffc98f74e4a7b0a119e',
  measurementId: 'G-PYQ21B2KVL',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default { db, auth };
