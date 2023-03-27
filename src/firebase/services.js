import {db} from './config';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
// import {v4 as uuidv4} from 'uuid';

const addDocument = async (coll, data) => {
  try {
    const docRef = await addDoc(collection(db, coll), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const setDocument = async (collectionPath, data, id) => {
  try {
    const docData = {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    const docRef = await setDoc(doc(db, collectionPath, id), docData);

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const updateDocument = async (collectionPath, id, data) => {
  try {
    const docData = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(doc(db, collectionPath, id), docData);

    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const deleteDocument = async (collectionPath, id = null) => {
  try {
    // const docRef = await setDoc(doc(db, collectionPath, id), {
    //   ...data,
    //   updatedAt: serverTimestamp(),
    //   ...(type === 'create' && {createdAt: serverTimestamp()}),
    // });
    const docRef = await deleteDoc(doc(db, collectionPath, id));

    console.log('Deleted document with id: ', id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export {addDocument, setDocument, deleteDocument, updateDocument};
