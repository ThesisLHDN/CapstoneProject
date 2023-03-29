import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAdditionalUserInfo,
} from 'firebase/auth';
import authErrors from './authErrors';

import {collection, addDoc} from 'firebase/firestore';

import {db, auth} from 'src/firebase/config';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const errorCodeConverter = (error) => {
  const errorCode = error.replace('auth/', '');
  return authErrors[errorCode];
};

export {errorCodeConverter};
