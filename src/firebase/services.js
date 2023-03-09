import {db} from './config';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';

export const addDocument = async (coll, data) => {
  //   const query = collection(db, collection);
  try {
    const docRef = await addDoc(collection(db, coll), {
      ...data,
      createAt: serverTimestamp(),
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
