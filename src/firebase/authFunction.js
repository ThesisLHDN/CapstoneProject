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

const facebookAuthHandler = () => {
  // const auth = getAuth();
  signInWithPopup(auth, facebookProvider)
    .then(async (result) => {
      // The signed-in user info.
      const user = result.user;

      if (getAdditionalUserInfo(result).isNewUser) {
        try {
          const docRef = await addDoc(collection(db, 'users'), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            provider: getAdditionalUserInfo(result).providerId,
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      // console.log('credential: ', credential);
      const accessToken = credential.accessToken;
    })
    .catch((error) => {
      // Handle Errors here.
      // setError(errorCodeConverter(error.code));
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
    });
  // console.log('Login facebook', {data});
};
const googleAuthHandler = () => {
  // const auth = getAuth();
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      // The signed-in user info.
      const user = result.user;
      if (getAdditionalUserInfo(result).isNewUser) {
        try {
          const docRef = await addDoc(collection(db, 'users'), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: getAdditionalUserInfo(result).providerId,
          });
          console.log('Document written with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      }

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
    })
    .catch((error) => {
      // Handle Errors here.
      // setError(errorCodeConverter(error.code));
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export {errorCodeConverter, facebookAuthHandler, googleAuthHandler};
