// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAnalytics} from 'firebase/analytics';
// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBkhKv9Rmafk-CK6sjR_FHPnE0_24FqVIY',
  authDomain: 'capstone-project-2cd01.firebaseapp.com',
  projectId: 'capstone-project-2cd01',
  storageBucket: 'capstone-project-2cd01.appspot.com',
  messagingSenderId: '201933450290',
  appId: '1:201933450290:web:87287bd656f8880d51e02b',
  measurementId: 'G-EXN4XWFW7N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

connectAuthEmulator(auth, 'http://localhost:9099');

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export {db, auth, analytics, storage};

export default app;
