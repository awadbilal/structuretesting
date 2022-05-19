import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAQEIuCc4nfmgAlsNY3m9eyGBf1giunjCM',
  authDomain: 'cmp-capstone.firebaseapp.com',
  projectId: 'cmp-capstone',
  storageBucket: 'cmp-capstone.appspot.com',
  messagingSenderId: '478812076219',
  appId: '1:478812076219:web:78cffc98f74e4a7b0a119e',
  measurementId: 'G-PYQ21B2KVL',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(getApp());
export const db = getFirestore(app);
export const store = getStorage(app, 'gs://cmp-capstone.appspot.com/');
