import { initializeApp } from 'firebase/app';
import * as Auth from 'firebase/auth';
import * as Firestore from 'firebase/firestore';

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

const db = Firestore.getFirestore(app);
const auth = Auth.getAuth(app);

export { db, auth };
