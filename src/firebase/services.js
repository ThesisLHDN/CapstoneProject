import {db} from './config';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
// import {v4 as uuidv4} from 'uuid';

const addDocument = async (coll, data) => {
  try {
    const docRef = await addDoc(collection(db, coll), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const setDocument = async (collectionName, data, id, type = 'update') => {
  try {
    const docRef = await setDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: serverTimestamp(),
      ...(type === 'create' && {createdAt: serverTimestamp()}),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export {addDocument, setDocument};
