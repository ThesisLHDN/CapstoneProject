import {db, auth} from './config';
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
  limit,
} from 'firebase/firestore';

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
      deleteDoc(doc(db, collectionPath, `${snap.id}`));
    });
  }
};

// const bulkDelete = async (collectionPath, condition = {}) => {
//   console.log('delete bulk with condition:', collectionPath, condition);
//   const collRef = collection(db, collectionPath);
//   const q =
//     collectionPath === 'rooms'
//       ? query(
//           collection(db, 'messages'),
//           where(
//             condition.fieldName,
//             condition.operator,
//             condition.compareValue,
//           ),
//         )
//       : query(collRef, limit(batchSize));
//   while (true) {
//     const qBatch = query(q, limit(batchSize));
//     const batchSnap = await getDocs(qBatch);
//     if (batchSnap.length === 0) {
//       break;
//     }
//     batchSnap.forEach((snap) => {
//       console.log('deletesnap', snap.id);
//       deleteDoc(doc(db, collectionPath, `${snap.id}`));
//     });
//   }
// };

const deleteDocument = async (collectionPath, id = null) => {
  console.log('delete', collectionPath, id);
  try {
    const docRef = await deleteDoc(doc(db, collectionPath, id));
    switch (collectionPath) {
      case 'projects':
        deleteCollection(`projects/${id}/documents`);
        break;
      case 'issues':
        deleteCollection(`issues/${id}/comments`);
        deleteCollection(`issues/${id}/replies`);
        // TODO delete file too
        break;
      case 'rooms':
        // TODO must use filter
        deleteCollection(`rooms`, {
          fieldName: 'roomId',
          operator: '==',
          compareValue: `${id}`,
        });
        break;
      default:
        console.log('cannot delete collection', collectionPath);
        break;
    }

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
      updateDocument('users', uid, data);
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
  getDocumentWithCondition,
};
