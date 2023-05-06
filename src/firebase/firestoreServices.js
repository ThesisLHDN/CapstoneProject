import {db} from './config';
import {
  collection,
  addDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';

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

const setDocument = async (collectionPath, id, data) => {
  try {
    const docData = {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };

    const docRef = await setDoc(doc(db, collectionPath, id), docData);

    // console.log('Document written with ID: ', docRef.id);
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

    const docRef = await updateDoc(doc(db, collectionPath, id), docData);

    console.log(
      'Document with ID updated: ',
      docRef ? docRef.id : 'null docRef',
    );
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

const deleteDocument = async (collectionPath, id = null) => {
  try {
    const docRef = await deleteDoc(doc(db, collectionPath, id));

    console.log('Deleted document with id: ', id);
  } catch (e) {
    console.error('Error delete document: ', e);
  }
};

const getDocumentWithCondition = (collectionName, condition) => {
  const q = query(
    collection(db, collectionName),
    where(condition.fieldName, condition.operator, condition.compareValue),
  );

  const querySnapshot = getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });
  return querySnapshot;
};

export {
  addDocument,
  setDocument,
  deleteDocument,
  updateDocument,
  getDocumentWithCondition,
};
