import {db, auth, storage} from './config';
import {
  collection,
  addDoc,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where,
  limit,
} from 'firebase/firestore';

import {ref, deleteObject} from 'firebase/storage';

import {updateProfile} from 'firebase/auth';

const batchSize = 100;

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

const updateDocument = async (collectionPath, id, data, updateDate = true) => {
  try {
    const docData = {
      ...data,
      ...(updateDate && {updatedAt: serverTimestamp()}),
    };

    const docRef = await updateDoc(doc(db, collectionPath, `${id}`), docData);

    console.log(
      'Document with ID updated: ',
      docRef ? docRef.id : 'null docRef',
    );
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

const deleteCollection = async (collectionPath, condition = {}) => {
  console.log('delete collection', collectionPath);
  const collRef = collection(db, collectionPath);
  const q =
    collectionPath === 'messages'
      ? query(
          collection(db, 'messages'),
          where(
            condition.fieldName,
            condition.operator,
            condition.compareValue,
          ),
        )
      : query(collRef, limit(batchSize));
  while (true) {
    const qBatch = query(q, limit(batchSize));
    const batchSnap = await getDocs(qBatch);
    if (batchSnap.length === 0) {
      break;
    }
    batchSnap.forEach((snap) => {
      console.log('deletesnap', snap.id);
      // deleteDoc(doc(db, collectionPath, `${snap.id}`));
      deleteDoc(collectionPath, `${snap.id}`);
    });
  }
};

const deleteFromStorage = (path) => {
  if (path) {
    const desertRef = ref(storage, path);
    // console.log('document path', document.data().storagePath);
    deleteObject(desertRef)
      .then(() => {
        console.log('Deleted: ', path);
      })
      .catch((error) => {
        console.log('Error deleted: ', path, error);
      });
  }
  return false;
};

const deleteDocument = async (collectionPath, data) => {
  console.log(data);
  const id = `${data.id}`;
  console.log('delete', collectionPath, id);
  var storagePath = null;
  try {
    const split = collectionPath.split('/');
    const last = split[split.length - 1];
    switch (last) {
      case 'projects':
        deleteCollection(`projects/${id}/documents`);
        deleteCollection(`issues`, {
          fieldName: 'projectId',
          operator: '==',
          compareValue: `${id}`,
        });
        break;
      case 'issues':
        deleteCollection(`issues/${id}/comments`);
        deleteCollection(`issues/${id}/replies`);
        deleteCollection(`issues/${id}/documents`);
        break;
      case 'rooms':
        deleteCollection(`messages`, {
          fieldName: 'roomId',
          operator: '==',
          compareValue: `${id}`,
        });
        break;
      case 'messages':
        storagePath = data.file ? data.file.storagePath : null;
        deleteFromStorage(storagePath);
        break;
      case 'comments':
        storagePath = data.storagePath;
        deleteFromStorage(storagePath);
        break;
      case 'documents':
        storagePath = data.storagePath;
        deleteFromStorage(storagePath);
        break;
      default:
        console.log(collectionPath.split('/')[collectionPath.length - 1]);
        console.log('Cannot delete collection', collectionPath);
        break;
    }
    await deleteDoc(doc(db, collectionPath, id));
    console.log(`Deleted document at ${collectionPath} with id: ${id}`);
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

const updateAuthFirestore = (uid, data) => {
  if (uid && data) {
    try {
      updateDocument('users', `${uid}`, data);
      updateProfile(auth.currentUser, data);
    } catch (e) {
      console.log('Error updating both Authentication and Firestore', e);
    }
  }
};

export {
  updateAuthFirestore,
  addDocument,
  setDocument,
  deleteDocument,
  updateDocument,
  deleteCollection,
  // getDocumentWithCondition,
};
