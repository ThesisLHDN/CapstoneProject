import {useState} from 'react';
// import {errorCodeConverter} from 'src/firebase/authFunction';
import authErrors from './authErrors';

import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {auth} from 'src/firebase/config';
import {setDocument} from 'src/firebase/firestoreServices';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const errorCodeConverter = (error) => {
  if (!error) return '';
  const errorCode = error.replace('auth/', '');
  return authErrors[errorCode];
};

const addNewUser = (user, provider) => {
  if (user) {
    setDocument('users', user.uid, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      provider,
    });
  }
};

const facebookLoginHandler = () => {
  signInWithPopup(auth, facebookProvider)
    .then(async (result) => {
      const user = result.user;

      if (getAdditionalUserInfo(result).isNewUser) {
        try {
          addNewUser(user, getAdditionalUserInfo(result).providerId);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
      // setUserData(user);
    })
    .catch((error) => {
      return errorCodeConverter(error.code);
    });
};

const googleLoginHandler = () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const user = result.user;
      if (getAdditionalUserInfo(result).isNewUser) {
        try {
          addNewUser(user, getAdditionalUserInfo(result).providerId);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }
    })
    .catch((error) => {
      return errorCodeConverter(error.code);
    });
};

export {googleLoginHandler, facebookLoginHandler, addNewUser};
